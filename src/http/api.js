import request from './request'

export function get(url,data){
    return request.get(url,{
        params:data
    })
}

export function post(url, data) {
    return request.post(url, data)
}

export function put(url, data) {
    return request.put(url, data)
}

// 登录接口
export function ajaxlogin(type,data){
    return post(type,data)
}
// 左侧菜单接口
export function ajaxmenus(type){
    return get(type)
}
// 右侧用户数据
export function ajaxusers(type,data){
    return get(type,data)
}
// 添加数据
export function ajaxaddusers(type,data){
    return post(type,data)
}
// 修改用户状态
export function ajaxxiugai(type,data){
    return put(type,data)
}