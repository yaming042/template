import React from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './../../store'
import history from './../../utils/history'

import { ConfigProvider } from 'antd'
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/lib/locale/zh_CN'
import 'moment/locale/zh-cn'
import 'antd/dist/antd.css'

import { menuConfig } from './../../utils/menuConfig'
import Layout from './layout'

import NotFound from './../notFound'
import Index from './home'
import Detial from './detial'
import Admin from './admin'

ReactDOM.render(
    <Provider store={ store }>
        <ConfigProvider locale={ zhCN }>
            <Router history={ history }>
                <Switch>
                    <Route exact path="/admin" component={ Admin } />
                    <Layout>
                        <Switch>
                            <Route exact path="/" component={ Index } />
                            <Route exact path="/:type" component={(props) => {
                                const type = props.match.params.type
                                const exist = menuConfig.find(d => d.url.indexOf(type) > 0)
                                let comp = null
                                if( exist ){
                                    comp = <Detial {...props} />
                                }else{
                                    comp = <NotFound {...props} />
                                }

                                return comp
                            }} />
                            <Route component={ NotFound } />
                        </Switch>
                    </Layout>
                </Switch>
            </Router>
        </ConfigProvider>
    </Provider>,
    document.getElementById('root')
)