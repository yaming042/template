import React from 'react'
import { Upload, Modal } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

export default class Comp extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            fileList: props.value || [],
        };
    }

    componentWillReceiveProps(nextProps){
        if( JSON.stringify(this.props) != JSON.stringify(nextProps) ){
            this.setState({
                fileList: nextProps.value || [],
            })
        }
    }
    /**
     * 获取缩略图
     *
     * @param {*} file
     * @return {*} 
     * @memberof Comp
     */
    getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    fileChange({file, fileList}){
        this.setState({
            fileList: fileList
        }, () => {
            const { callback } = this.props
            callback && callback( fileList )
        })
    }
    handleRemove(e){}

    render(){
        const { fileList } = this.state
        const { limit, multiple } = this.props
        const uploadButton = (
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>上传图片</div>
            </div>
        )

        return (
            <div className="upload-container">
                <Upload
                    multiple={ multiple || false }
                    listType="picture-card"
                    fileList={ fileList }
                    beforeUpload={ () => false }            // 阻止默认的上传，改为手动上传
                    onChange={ this.fileChange.bind(this) } // 阻止默认上传后，这个就失效了貌似
                    showUploadList={{
                        showPreviewIcon: false
                    }}
                    onRemove={ this.handleRemove.bind(this) }
                >
                    { fileList.length >= (limit || 10) ? null : uploadButton }
                </Upload>
            </div>
        )
    }
}