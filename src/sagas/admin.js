import { all, call, takeLatest } from "redux-saga/effects"
import { UPLOAD_NEW_PLUGIN } from "../actions/constant"
import { uploadToOss, newPlugin } from "./../services/admin"
import { UPLOAD_TO_OSS, CREATE_NEW_EXT } from "./../utils/requestConfig"

// 上传文件
function* createNewPlugin(action){
    const { view_file, icon_file, ext_file, name, catalog, source_url, source_name, downloads, introduce } = action.value
    // 1. 先上传所有文件，如果文件上传失败，那么就停止数据入库
    let requestPromise = []
    let uploadFiles = {
        view: view_file || [],
        icon: icon_file || [],
        ext: ext_file || []
    }
    Object.keys(uploadFiles).map((key) => {
        (uploadFiles[key] || []).map((item) => {
            let formData = new FormData()
            formData.append('file', item.originFileObj)
            formData.append('type', key)

            let p = new Promise((resolve, reject) => {
                return resolve( uploadToOss(UPLOAD_TO_OSS, {method: 'POST', data: formData}) )
            })
            requestPromise.push( p )
        })
    })

    const responsePromise = yield all( requestPromise )
    console.log('responsePromise: ', responsePromise)

    if( responsePromise.find(d => d.status != 200) ){
        console.log(`上传存在失败`)
        return
    }

    const responseUpload = responsePromise.map(d => d.data).reduce((a,b) => a.concat(b), [])
    const postData = {
        ext_file: responseUpload.filter(d => d.type == 'ext') || [],
        view_file: responseUpload.filter(d => d.type == 'view') || [],
        name: name,
        catalog: catalog,
        icon_file: responseUpload.filter(d => d.type == 'icon') || [],
        source_url: source_url,
        source_name: source_name,
        downloads: downloads,
        introduce: introduce
    }

    // 2. 图片上传成功后应该有返回图片地址，甚至图片ID
    const result = yield call(newPlugin, CREATE_NEW_EXT, {method: 'POST', data: postData})
    console.log(111, result)

}
function* watch_new(){
    yield takeLatest(UPLOAD_NEW_PLUGIN, createNewPlugin)
}

export default function* (){
    yield all([
        watch_new()
    ])
}