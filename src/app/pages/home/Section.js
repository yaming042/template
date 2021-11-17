import React from 'react'
import styles from './Section.scss'
import { Link } from 'react-router-dom'

class Comp extends React.Component{
    constructor(props){
        super(props)

        this.state = {}
    }

    render(){
        const { title, showLine, subTitle, hrefTitle, href, id } = this.props

        return (
            <div className={ styles['section-body'] }>
                {
                    showLine && <div className={ styles['hr'] }></div>
                }
                <div className={ styles['container'] }>
                    <div className={ styles['header'] }>
                        <div className={ styles['title'] }>
                            <h2>{ title }</h2>
                            <div className={ styles['more'] }>
                                <Link to={ href } target="_blank">{ hrefTitle }</Link>
                            </div>
                        </div>
                        <div className={ styles['subtitle'] }>{ subTitle }</div>
                    </div>
                    <div className={ styles['content'] }>
                        <div className={ styles['list'] }>
                            {
                                [1,2,3,4,5,6,7,8].map((item) => {
                                    return (
                                        <div
                                            key={item}
                                            className={ styles['item'] }
                                        >
                                            <div className={ styles['item-img'] }>
                                                <img src="/images/logo.jpeg" alt="" />
                                                <div className={ styles['mask'] }>
                                                    Capture a screenshot of your current page in entirety and reliably—without requesting any extra permissions!
                                                </div>
                                            </div>
                                            <div className={ styles['description'] }>
                                                <div className={ styles['text'] }>GoFullPage - Full Page Screen Capture</div>
                                                <div className={ styles['download'] }>
                                                    <span className="iconfont icon-download-1"></span>20000+
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Comp