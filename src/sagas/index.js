import { fork, all } from 'redux-saga/effects'
import homeSaga from './home'
import adminSaga from './admin'


export default function* (){
    yield all([
        fork( homeSaga ),
        fork( adminSaga ),
    ])
}