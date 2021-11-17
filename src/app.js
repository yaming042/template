import React from 'react'
import { connect } from 'react-redux'
import { testAction } from './actions'

class Comp extends React.Component{
    constructor(props){
        super(props)

        this.state = {}
    }

    click(){
        const { test } = this.props
        test && test()
    }
    click2(){
        const { dispatch } = this.props
        dispatch && dispatch( testAction('321') )
    }

    render(){
        return (
            <div>
                <h3>hello world</h3>
                <div>
                    <button onClick={ this.click.bind(this) }>点击</button>
                    <button onClick={ this.click2.bind(this) }>点击2</button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        ...state,
    }
}
function mapDispatchToProps(dispatch){
    return {
        dispatch,
        test(){
            dispatch({
                type: 'test_saga_action',
                value: '123'
            })
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Comp)