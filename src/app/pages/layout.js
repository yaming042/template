import React from 'react'
import styles from './layout.scss'
import Navbar from './../../components/Navbar'

class Layout extends React.Component{
    constructor(props){
        super(props)
    }

    render(){

        return (
            <div className={ styles['home'] }>
                {/* 顶部 */}
                <div className={ styles['header'] }>
                    <div>
                        <a href="#">
                            <img src="/images/logo.jpeg" alt="Logo" />
                            <span>测试测试</span>
                        </a>
                    </div>
                </div>
                <div className={ styles['container'] }>
                    {/* 菜单 */}
                    <Navbar />
                    {/* 主体 */}
                    <div className={ styles['content'] }>
                        { this.props.children || null }
                    </div>
                </div>
                {/* 底部 */}
                <div className={ styles['footer'] }>
                    <div>footer</div>
                </div>
            </div>
        )
    }
}

export default Layout