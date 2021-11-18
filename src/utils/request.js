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
        timeout: options.timeout || 1000,
        responseType: options.responseType || `json`,
    }

    return new Promise((resolve, reject) => {
        axios( axiosOption )
        .then((response) => {
            const { status } = response
            if( status === 200 ){
                resolve( response )
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