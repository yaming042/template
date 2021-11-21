import request from './../utils/request'

export async function uploadToOss(url, opts={}){
    const options = {
        method: opts.method,
        data: opts.file || {},
    }
    return request(url, options)
}