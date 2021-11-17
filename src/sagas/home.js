import { delay, takeLatest, all, put } from 'redux-saga/effects'

// 这里就直接执行了
function* test_saga_1(){
    yield delay(1000)

    console.log( `test_saga_1` )
}
// 这里就直接执行了
function* test_saga_2(){
    yield delay(2000)

    console.log( `test_saga_2` )
}

function* test_saga_action(){
    console.log( `test_saga_action` )

    yield delay(10000)

    yield put({
        type: 'TEST_ACTION',
        value: 'saga ok'
    })
}

// 这里可以监听
function* watchSaga(){
    yield takeLatest('test_saga_action', test_saga_action)
}

export default function* (){
    yield all([
        test_saga_1(),
        test_saga_2(),
        watchSaga()
    ])
}