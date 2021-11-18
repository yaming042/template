import { delay, takeLatest, all, put } from 'redux-saga/effects'
import {
    getAllSource
} from './../services/home'
import {
    INIT_HOME
} from './../actions/constant'
import { API_TEST } from './../utils/requestConfig'

/*
    获取所有资源，初始化首页
*/
function* initHomePage(){
    const res = yield getAllSource(API_TEST)
    console.log( 1, res )
}

// 这里可以监听
function* watch_init(){
    yield takeLatest(INIT_HOME, initHomePage)
}

export default function* (){
    yield all([
        watch_init(),
    ])
}