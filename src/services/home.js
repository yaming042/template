import request from './../utils/request'

export async function getAllSource(url, data={}){
    return request(url, data)
}