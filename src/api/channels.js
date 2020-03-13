import requestQ from '@/utilis/request'

//todo  当前用户频道
export function get_channels() {

    return requestQ({
        url: "user/channels",
        method: 'get'
    })
}



//todo  所有频道
export function get_allChannels() {

    return requestQ({
        url: 'channels',
        method: 'get',
        
    })
}