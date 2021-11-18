import { all, takeLatest } from "redux-saga/effects"
import { UPLOAD_NEW_PLUGIN } from "../actions/constant"
import { uploadToOss } from "./../services/admin"
import { UPLOAD_TO_OSS } from "./../utils/requestConfig"

// 上传文件
function* createNewPlugin(action){
    const { value } = action
    // 1. 先上传图片，如果图片上传失败，那么就停止数据入库
    const response = yield uploadToOss(UPLOAD_TO_OSS, {method: 'POST', data: {files: value.show_picture}})
    console.log('saga return: ', response)
    // 2. 图片上传成功后应该有返回图片地址，甚至图片ID
}
function* watch_new(){
    yield takeLatest(UPLOAD_NEW_PLUGIN, createNewPlugin)
}

export default function* (){
    yield all([
        watch_new()
    ])
}