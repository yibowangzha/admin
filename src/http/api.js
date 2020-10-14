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







// 右侧用户数据
export function ajax2roles(type){
    return get(type)
}
// 删除角色知道权限
export function ajax2delete(type,data){
    return del(`roles/${type}/rights/${data}`)
}
// 添加角色
export function ajaxaddrole(type,data){
    return post(type,data)
}
// 删除角色
export function ajax2del(type){
    return del(`roles/${type}`)
}
// 编辑获取
export function ajax2revise(type){
    return get(`roles/${type}`)
}
// 编辑在获取
export function ajax2update(type,data){
    return put(`roles/${type}`,data)
}



// 权限列表
export function ajax3rights(type){
    return get(`rights/${type}`)
}


// 商品列表
export function ajaxgoods(type,data){
    return get(type,data)
}
export function ajax3del(type){
    return del(`goods/${type}`)
}

// 订单列表
export function ajaxorders(type,data){
    return get(type,data)
}


// 数据报表
export function ajaxreports(type){
    return get(`${type}/type/1`)
}