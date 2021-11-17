import { fork, all } from 'redux-saga/effects'
import homeSaga from './home'


export default function* (){
    yield all([
        fork( homeSaga )
    ])
}