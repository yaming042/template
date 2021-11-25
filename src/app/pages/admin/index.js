import React from 'react'
import { connect } from 'react-redux'
import { Form, Row, Col, Input, InputNumber, Select, Button } from 'antd'
import styles from './index.scss'
import Upload from './upload'
import { UPLOAD_NEW_PLUGIN } from './../../../actions/constant'

import BraftEditor from './editor'


const formItemLayout = {
    labelCol: {
        span: 4
    },
    // wrapperCol: {
    //     span: 20
    // }
}
class Comp extends React.Component{
    constructor(props){
        super(props)

        this.state = {}
    }

    submit(values){
        const { dispatch } = this.props

        let t = setTimeout(() => {
            clearTimeout(t)

            this.form.validateFields().then((values) => {
                dispatch({
                    type: UPLOAD_NEW_PLUGIN,
                    value: values
                })
                console.log( 'form values: ', values )
            }).catch((error) => {
                console.log( error, error.message )
            })
        }, 0)
    }

    uplodaPicture(e){}

    render(){

        return (
            <div className={ styles['admin-container'] }>
                <h2>后台</h2>
                <div className={ styles['content'] }>
                    <Form
                        ref={node => this.form = node}
                        { ...formItemLayout}
                        layout="vertical"
                        initialValues={{
                            ext_file: [],
                            view_file: [],
                            name: '',
                            catalog: '',
                            icon_file: [],
                            source_url: '',
                            source_name: '',
                            downloads: 10,
                            introduce: ''
                        }}
                        scrollToFirstError={ true }
                    >
                        <Row gutter={10}>
                            <Col span={12}>
                                <Form.Item
                                    name={`ext_file`}
                                    label={`安装包`}
                                    rules={[
                                        {
                                            required: false,
                                            message: '请上传安装包',
                                            validator: (_, values, callback) => {
                                                if( _.required && (!values || !values.length) ){
                                                    return Promise.reject()
                                                }else{
                                                    return Promise.resolve()
                                                }
                                            }
                                        },
                                    ]}
                                >
                                    <Upload
                                        multiple={ false }
                                        accept={`.crx`}
                                        limit={ 1 }
                                        placehoder={`上传安装包`}
                                        callback={(files) => {
                                            this.form.setFieldsValue({'ext_file': files})
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name={`icon_file`}
                                    label={`图标`}
                                    rules={[
                                        {
                                            required: false,
                                            message: '文件图标不能为空'
                                        }
                                    ]}
                                >
                                    <Upload
                                        multiple={ true }
                                        accept={ `image/*` }
                                        limit={ 1 }
                                        placehoder={`上传图标`}
                                        callback={(files) => {
                                            this.form.setFieldsValue({'icon_file': files})
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={10}>
                            <Col span={24}>
                                <Form.Item
                                    name={`view_file`}
                                    label={`简介图`}
                                    rules={[
                                        {
                                            required: true,
                                            message: '文件简介图不能为空',
                                            validator: (_, values, callback) => {
                                                if( !values || !values.length ){
                                                    return Promise.reject()
                                                }else{
                                                    return Promise.resolve()
                                                }
                                            }
                                        },
                                    ]}
                                >
                                    <Upload
                                        multiple={ true }
                                        accept={ `image/*` }
                                        limit={ 6 }
                                        placehoder={`上传图片`}
                                        callback={(files) => {
                                            this.form.setFieldsValue({'view_file': files})
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={10}>
                            <Col span={12}>
                                <Form.Item
                                    name={`name`}
                                    label={`名称`}
                                    rules={[
                                        {
                                            required: false,
                                            message: '文件名称不能为空'
                                        }
                                    ]}
                                >
                                    <Input placeholder={`请输入文件名称`} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name={`catalog`}
                                    label={`分类`}
                                    rules={[
                                        {
                                            required: false,
                                            message: '文件分类不能为空'
                                        }
                                    ]}
                                >
                                    <Select
                                        placeholder={`请选择分类`}
                                    >
                                        <Select.Option key={1} value={1}>测试-1</Select.Option>
                                        <Select.Option key={2} value={2}>测试-2</Select.Option>
                                        <Select.Option key={3} value={3}>测试-3</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={10}>
                            <Col span={8}>
                                <Form.Item
                                    labelCol={{
                                        span: 8
                                    }}
                                    name={`source_url`}
                                    label={`来源地址`}
                                    rules={[
                                        {
                                            required: false,
                                            message: '文件来源地址不能为空'
                                        }
                                    ]}
                                >
                                    <Input placeholder={`请输入来源地址`} />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    labelCol={{
                                        span: 8
                                    }}
                                    name={`source_name`}
                                    label={`来源名称`}
                                    rules={[
                                        {
                                            required: false,
                                            message: '文件来源名称不能为空'
                                        }
                                    ]}
                                >
                                    <Input placeholder={`请输入来源名称`} />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    labelCol={{
                                        span: 8
                                    }}
                                    name={`downloads`}
                                    label={`下载量`}
                                >
                                    <InputNumber style={{width:'100%'}} placeholder={`请输入下载量`} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={10}>
                            <Col span={24}>
                                <Form.Item
                                    name={`introduce`}
                                    label={`详细信息`}
                                    rules={[
                                        {
                                            required: false,
                                            message: '文件详细信息不能为空',
                                            validator: (_, value, callback) => {
                                                if( _.required && (!value || value == '<p></p>') ){
                                                    return Promise.reject()
                                                }else{
                                                    return Promise.resolve()
                                                }
                                            }
                                        }
                                    ]}
                                >
                                    <BraftEditor
                                        ref={node => this.editor = node}
                                        callback={(html) => {
                                            this.form.setFieldsValue({'introduce': html})
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </div>
                <Button
                    className={ styles['affix-button'] }
                    shape="circle"
                    type="primary"
                    onClick={ this.submit.bind(this) }
                >提交</Button>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch){
    return {
        dispatch,
    }
}
export default connect(mapDispatchToProps)(Comp)