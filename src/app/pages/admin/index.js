import React from 'react'
import { Form, Row, Col, Input, InputNumber, Select, Upload, Button, Affix } from 'antd'
import { InboxOutlined } from '@ant-design/icons';
import styles from './index.scss'

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
        let t = setTimeout(() => {
            clearTimeout(t)

            this.form.validateFields().then((values) => {
                console.log( values )
            }).catch((error) => {
                console.log( error.message )
            })
        }, 0)
    }

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
                            name: '',
                            show_picture: null,
                            catalog: '',
                            icon: '',
                            source_url: '',
                            source_name: '',
                            downloads: 0,
                            introduce: ''
                        }}
                    >
                        <Row gutter={10}>
                            <Col span={24}>
                                <Form.Item
                                    name={`name`}
                                    label={`名称`}
                                    rules={[
                                        {
                                            required: true,
                                            message: '文件名称不能为空'
                                        }
                                    ]}
                                >
                                    <Input placeholder={`请输入文件名称`} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={10}>
                            <Col span={24}>
                                <Form.Item
                                    name={`show_picture`}
                                    label={`简介图`}
                                    rules={[
                                        {
                                            required: false,
                                            message: '文件简介图不能为空'
                                        },
                                    ]}
                                    valuePropName="fileList"
                                >
                                    <Upload.Dragger
                                        name="files"
                                        action="/upload.do"
                                    >
                                        <p className="ant-upload-drag-icon"><InboxOutlined /></p>
                                        <p className="ant-upload-text">单击或将文件拖到此区域以上传</p>
                                        <p className="ant-upload-hint">支持单个或批量上传</p>
                                    </Upload.Dragger>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={10}>
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
                            <Col span={12}>
                                <Form.Item
                                    name={`icon`}
                                    label={`图标`}
                                    rules={[
                                        {
                                            required: false,
                                            message: '文件图标不能为空'
                                        }
                                    ]}
                                >
                                    <Input placeholder={`请输入图标`} />
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
                                                if( !value || value == '<p></p>' ){
                                                    return Promise.reject('请输入正文内容')
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

export default Comp