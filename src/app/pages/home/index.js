import React from 'react'
import { connect } from 'react-redux'

import { Button } from 'antd'
import * as ACTION from './../../../utils/actions'
import styles from './index.scss'

import Swiper from './../../../components/Swiper'
import Section from './Section'

class Comp extends React.Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){}

    click(){
        const { clickFunc } = this.props
        clickFunc && clickFunc()
    }

    render(){
        return (
            <div className={ styles['home'] }>
                <div className={ styles['section-1'] }>
                    <Swiper />
                </div>
                <div className={ styles['section'] }>
                    <Section
                        title={`为你推荐`}
                        subTitle={`子标题`}
                        hrefTitle={`更多`}
                        href={`#`}
                        id={`recommand`}
                        showLine={ true }
                    />
                </div>
                <div className={ styles['section'] }>
                    <Section
                        title={`为你推荐`}
                        subTitle={`子标题`}
                        hrefTitle={`更多`}
                        href={`#`}
                        id={`recommand`}
                        showLine={ true }
                    />
                </div>
            </div>
        )
    }
}


function mapStateToProps(state){
    return state
}
function mapDispatchToProps(dispatch){
    return {
        clickFunc(){
            dispatch({
                type: ACTION.TEST,
                payload: {
                    items: [1]
                }
            })
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comp)