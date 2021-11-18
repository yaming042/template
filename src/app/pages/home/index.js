import React from 'react'
import { connect } from 'react-redux'

import * as ACTION_TYPES from './../../../actions/constant'
import styles from './index.scss'

import Swiper from './../../../components/Swiper'
import Section from './Section'

class Comp extends React.Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        // 发送请求，请求资源
        const { dispatch } = this.props
        dispatch({
            type: ACTION_TYPES.INIT_HOME
        })
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
        dispatch,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comp)