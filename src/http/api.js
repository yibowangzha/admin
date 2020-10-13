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

export function del(url, data) {
    return request.delete(url,{
        params:data
    })
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
export function ajaxupdate(type,data){
    return put(`users/${type}/state/${data}`)
}
// 删除用户
export function ajaxdelete(type){
    return del(`users/${type}`)
}
// 修改
export function ajaxrevise(type){
    return get(`users/${type}`)
}
// 更新
export function ajaxrenewal(type,data){
    return put(`users/${type}`,data)
}







export function ajax2roles(type){
    return get(type)
}