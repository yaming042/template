import React from 'react'
import Swiper from './../../../components/Swiper'
import styles from './index.scss'

class Comp extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div className={ styles['detial-container'] }>
                <div className={ styles['header'] }>
                    <div className={ styles['img'] }>
                        <img src="https://www.cxyhub.com/wp-content/uploads/2021/05/logo-1.png" alt="" />
                    </div>
                    <div className={ styles['introduce'] }>
                        <h2>脚本脚本脚本脚本脚本脚本脚本</h2>
                        <div className={ styles['info'] }>
                            <div className={ styles['info-item'] }>来源: <a href="#">gofullpage.com</a></div>
                            <div className={ styles['info-item'] }>用户: 999+</div>
                            <div className={ styles['info-item'] }>上传时间: 2021-12-12</div>
                            <div className={ styles['info-item'] }>分类: 开发工具</div>
                        </div>
                    </div>
                </div>
                <div className={ styles['hr'] }></div>
                <div className={ styles['detial-content'] }>
                    <div className={ styles['swiper'] }>
                        <Swiper />
                    </div>
                    <div className={ styles['content-text'] }>
                        <h2>简介</h2>
                        <div>
                            <p>Tampermonkey 是一款免费的浏览器扩展和最为流行的用户脚本管理器，它适用于 Chrome, Microsoft Edge, Safari, Opera Next, 和 Firefox。虽然有些受支持的浏览器拥有原生的用户脚本支持，但 Tampermonkey 将在您的用户脚本管理方面提供更多的便利。</p>
                            <p>Capture a screenshot of your current page in entirety and reliably—without requesting any extra permissions!</p>
                            <p>The simplest way to take a full page screenshot of your current browser window. Click on the extension icon (or press Alt+Shift+P), watch the extension capture each part of the page, and be transported to a new tab of your screenshot where you can download it as an image or PDF or even just drag it to your desktop.</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Comp