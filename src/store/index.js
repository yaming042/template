import { createStore, applyMiddleware, compose } from "redux"
import createSagaMiddleware from "redux-saga"
import rootReducer from './../reducers'
import rootSaga from './../sagas'

// 创建saga中间件
const sagaMiddleware = createSagaMiddleware( rootSaga )
// redux-devtool插件
const enhancerWithDevtool = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose
// 应用 redux-devtool
const enhancer = enhancerWithDevtool( applyMiddleware(sagaMiddleware))
// 创建store
const store = createStore(rootReducer, enhancer)
// 启动saga
sagaMiddleware.run( rootSaga )

export default store