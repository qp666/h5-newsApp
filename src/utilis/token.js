


//封装token方法


//取token方法
export function getToken() {
    return JSON.parse(window.localStorage.getItem('tokenInfo')) //从window里面取出token
}

//存token方法
export function setToken(key,val) {
   window.localStorage.setItem(key,val) //从window里面存入token
}

//删除token方法
export function removeToken(key) {
   window.localStorage.removeItem(key) //从window里面删除token
}