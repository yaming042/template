const express = require('express')
const fs = require('fs')
const router = express.Router()
const path = require('path')
const file = require('formidable')
const { v4: uuidv4 } = require('uuid')

const config = require('./../config/config.json')
const AliOss = require('./oss')
const fileDir = (config || {}).filedir || ''

const TestController = require('./../backend/controller/test')
const ExtensionController = require('./../backend/controller/extension')

// 获取文件名后缀
function getSuffix(str=''){
    return str.substring(str.lastIndexOf('.') + 1)
}

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
router.get('/test', function(req, res){
    res.send({status:200, data: [1,2,3], message: ''})
})

router.post('/2oss', async function(req, res){
    let formData = new file.IncomingForm()
    formData.parse(req, async (err, fields, file) => {
        if( !err ){
            const { filepath, originalFilename, newFilename, mimetype } = file.file || {}
            const { type } = fields
            if( filepath ){
                const suffix = getSuffix(originalFilename || '')
                const mime = mimetype.indexOf('image') > -1 ? 'image' : (mimetype.indexOf('application') > -1 ? 'ext' : 'unknow')

                let response = {}
                try{
                    response = await AliOss.client.put(`tymcrx/${fileDir[mime]}${newFilename}.${suffix}`, path.normalize(filepath), {})        // 得有第三个参数，不然会有点异常(只在后端)
                }catch(e){
                    response = e
                }

                const {status: invalidStatus, code: invalidCode, requestId} = response
                if( invalidCode ){
                    res.send({status: 510, data: {status: invalidStatus, code: invalidCode, requestId: requestId}, message: '上传至OSS失败'})
                }else{
                    const { name, url, res: {status} } = response
                    if( status === 200 ){
                        res.send({status: 200, data: {type: type, originName: originalFilename, newName: name, ossUrl: url}, message: 'OK'})
                    }else{
                        res.send({status:510, data: 'OSS 上传失败', message: 'error'})
                    }
                }

                // 删除掉原文件
                // fs.unlink(filepath, (err) => {
                //     console.log(`移除文件失败： `, err)
                // })
            }else{
                res.send({status:510, data: '未找到文件', message: '未找到文件'})
            }
        }else{
            res.send({status:510, data: error, message: error})
        }

        formData = null
    })
})
router.post('/create_extension', async function(req, res){
    const postData = {
        uuid: uuidv4(),
        ...req.body
    }

    const {error, result, message} = await ExtensionController.createExtension( postData )
    if( error ){
        return res.send({status: 510, data: null, message: error})
    }
    return res.send({status: 200, data: result, message: 'success'})
})

router.get('/mysql', async function(req, res){
    const result = await TestController.getAllData()
    res.send({status: 200, data: result, message: 'success'})
})

module.exports = router;
