import requestQ from '@/utilis/request'

//获取用户信息

export function get_channels() {

    return requestQ({
        url: 'user/channels',
        method: 'get'
    })
}