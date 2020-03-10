import requestQ from '@/utilis/request'

//获取用户信息

export function go_login(data) {

    return requestQ({
        url: 'authorizations',
        method: 'post',
        data
    })
}