import requestQ from '@/utilis/request'

//todo  获取用户登录信息方法
export function get_channels() {

    return requestQ({
        url: "user/channels",
        method: 'get'
    })
}