
//取token方法
export function getToken(name) {
    return window.localStorage.getItem(name) //从window里面取出token
}

//存token方法
export function setToken(name,val) {
   window.localStorage.setItem(name,val) //从window里面存入token
}

//删除token方法
export function removeToken(name) {
   window.localStorage.removeItem(name) //从window里面删除token
}