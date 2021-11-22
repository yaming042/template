const express = require('express');
const router = express.Router();
const path = require('path')
const file = require('formidable')

const config = require('./../config/config.json')
const AliOss = require('./oss')
const fileDir = (config || {}).filedir || ''

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
            if( filepath ){
                const suffix = getSuffix(originalFilename || '')
                const mime = mimetype.indexOf('image') > -1 ? 'image' : (mimetype.indexOf('application') > -1 ? 'exe' : 'unknow')

                let response = {}
                try{
                    response = await AliOss.client.put(`${fileDir[mime]}${newFilename}.${suffix}`, path.normalize(filepath), {})        // 得有第三个参数，不然会有点异常(只在后端)
                }catch(e){
                    response = e
                }

                const {status: invalidStatus, code: invalidCode, requestId} = response
                if( invalidCode ){
                    res.send({status: 510, data: {status: invalidStatus, code: invalidCode, requestId: requestId}, message: '上传至OSS失败'})
                }else{
                    const { name, url, res: {status} } = response
                    if( status === 200 ){
                        res.send({status: 200, data: {originName: originalFilename, newName: name, ossUrl: url}, message: 'OK'})
                    }else{
                        res.send({status:510, data: 'OSS 上传失败', message: 'error'})
                    }
                }
            }else{
                res.send({status:510, data: '未找到文件', message: '未找到文件'})
            }
        }else{
            res.send({status:510, data: error, message: error})
        }

        formData = null
    })
})

module.exports = router;
