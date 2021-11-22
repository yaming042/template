import axios from 'axios'
import {
    apiPrefix
} from './requestConfig'

export default function request( url, options={} ){
    let axiosOption = {
        url: url,                       // 格式 /xxx，前面带斜杠
        baseURL: apiPrefix,             // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL
        method: options.method || `GET`,
        data: options.data || {},
        timeout: options.timeout || 5000,       // xhr请求超时时间，默认5秒
        responseType: options.responseType || `json`,
    }
    if( options.headers ){
        axiosOption['headers'] = options.headers
    }

    return new Promise((resolve, reject) => {
        axios( axiosOption )
        .then((response) => {
            const { status } = response
            if( status === 200 ){
                resolve( response.data )
            }else{
                reject( response )
            }
        })
        .catch((error) => {
            const msg = error.message
            reject( {status:510, data: {}, message: msg} )
        })
    })
}