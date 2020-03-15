import requestQ from '@/utilis/request'

//todo  获取用户登录信息方法
export function go_login(data) {

    return requestQ({
        url: "authorizations",
        method: 'post',
        data
    })
}