import { all, call, takeLatest } from "redux-saga/effects"
import { UPLOAD_NEW_PLUGIN, QUERY_PLUGIN_BY_ID } from "../actions/constant"
import { uploadToOss, newPlugin, getPlugin } from "./../services/admin"
import { UPLOAD_TO_OSS, CREATE_NEW_EXT, GET_EXT_BY_ID } from "./../utils/requestConfig"

import { message } from 'antd'

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
    // console.log('responsePromise: ', responsePromise)

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
    const { status, data, message: msg} = yield call(newPlugin, CREATE_NEW_EXT, {method: 'POST', data: postData})
    if( status === 200 ){
        message.success(`创建扩展成功`)
    }else{
        message.error( msg )
    }

}
// 获取指定ID的数据
function* getPluginById(action){
    const { id } = action.value
    const {status, data, message: msg} = yield call(getPlugin, `${GET_EXT_BY_ID}?id=${id}`)
    console.log( status, data, msg)
}
function* watch_new(){
    yield takeLatest(UPLOAD_NEW_PLUGIN, createNewPlugin)
}
function* watch_edit(){
    yield takeLatest(QUERY_PLUGIN_BY_ID, getPluginById)
}

export default function* (){
    yield all([
        watch_new(),
        watch_edit(),
    ])
}