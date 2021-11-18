import { delay, takeLatest, all, put } from 'redux-saga/effects'
import {
    getAllSource
} from './../services/home'
import * as ACTION_TYPES from './../actions/constant'

/*
    获取所有资源，初始化首页
*/
function* initHomePage(){
    const res = yield getAllSource(`/test`)
    console.log( 1, res )
}

// 这里可以监听
function* watch_init(){
    yield takeLatest(ACTION_TYPES.INIT_HOME, initHomePage)
}

export default function* (){
    yield all([
        watch_init(),
    ])
}