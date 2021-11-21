const express = require('express');
const router = express.Router();
const path = require('path')
const file = require('formidable')

const AliOss = require('./oss')


/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
router.get('/test', function(req, res){
    res.send({status:200, data: [1,2,3], message: ''})
})

router.post('/2oss', async function(req, res){
    function getSuffix(str=''){
        return str.substring(str.lastIndexOf('.') + 1)
    }
    const formData = new file.IncomingForm()
    formData.parse(req, async (err, fields, file) => {
        if( !err ){
            const { filepath, originalFilename, newFilename } = file.file || {}
            if( filepath ){
                const suffix = getSuffix(originalFilename || '')
                let response = {}
                try{
                    response = await AliOss.client.put(`${newFilename}.${suffix}`, path.normalize(filepath), {})        // 得有第三个参数，不然会有点异常(只在后端)
                }catch(e){
                    response = e
                }
                
                const {status: invalidStatus, code: invalidCode, requestId} = response 
                if( invalidCode ){
                    res.send({status: 510, data: {status: invalidStatus, code: invalidCode, requestId: requestId}, message: '上传至OSS失败'})
                }else{
                    const { name, url, res: {status} } = response
                    if( status === 200 ){
                        res.send({status: 200, data: {originName: originalFilename, newFilename: name, ossUrl: url}, message: 'OK'})
                    }else{
                        res.send({status:510, data: 'something error', message: 'error'})
                    }
                }
            }else{
                res.send({status:510, data: '未找到文件', message: '未找到文件'})
            }
        }else{
            res.send({status:510, data: error, message: error})
        }
    })
})

module.exports = router;
