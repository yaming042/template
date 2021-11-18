import request from './../utils/request'

export async function uploadToOss(url, data={}){
    const options = {
        method: 'POST',
        data: data,
    }
    return request(url, options)
}