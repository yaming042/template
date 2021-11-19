const express = require('express');
const router = express.Router();
const fs = require('fs')
const multiparty = require('multiparty')
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
    const f = new file.IncomingForm()
    f.parse(req, (err, fields, file) => {
        console.log(111111111111, err)
        console.log(222222222222, fields)
        console.log(333333333333, file)

    })

    return res.send({status:200, data: [1,2,3], message: ''})
    const {name, url, res: {status, headers: {'x-oss-request-id': uuid}}} = await AliOss.client.put('222.png', req.body.file)
    const ossObj = {}
    if( status === 200 ){
        ossObj = {id: uuid, name: name, url: url}
    }
    console.log( 'oss return: ', ossObj )

    res.send({status:200, data: [1,2,3], message: ''})
})

module.exports = router;
