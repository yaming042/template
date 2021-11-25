import request from './../utils/request'

export async function uploadToOss(url, opts={}){
    const options = {
        method: opts.method,
        data: opts.data || {},
    }
    return request(url, options)
}

export async function newPlugin(url, opts={}){
    const options = {
        method: opts.method,
        data: opts.data || {},
    }
    return request(url, options)
}

export async function getPlugin(url){
    return request(url)
}
