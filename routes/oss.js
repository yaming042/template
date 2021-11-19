const OSS = require('ali-oss')
const config = require('./../config/config.json')

const client = new OSS({
    region: config.region,
    accessKeyId: config.accessKeyId,
    accessKeySecret: config.accessKeySecret,
    bucket: config.bucket
})

exports.client = client