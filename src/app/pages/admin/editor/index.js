import React from 'react'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import styles from './index.scss'
import { config } from './config'

class Comp extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            value: BraftEditor.createEditorState(null)
        }
    }

    blurEditor(e){
        const data = e.toHTML()
        this.setState({
            value: data,
        }, () => {
            const { callback } = this.props
            const { value } = this.state
            callback && callback( value )
        })
    }
    change(e){
        const data = e.toHTML()
        this.setState({
            value: data,
        })
    }

    render(){
        const { value } = this.state

        return (
            <div>
                <BraftEditor
                    className={ styles['braft-editor'] }
                    controls={ config.controls }
                    value={ value }
                    onBlur={ this.blurEditor.bind(this) }
                    onChange={ this.change.bind(this) }
                    style={{fontSize:16}}
                    placeholder="请输入正文内容"
                />
            </div>
        )
    }
}

export default Comp