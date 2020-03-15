import requestQ from '@/utilis/request'

//获取用户频道列表 弹出层使用

export function get_channels() {

    return requestQ({
        url: 'user/channels',
        method: 'get'
    })
}


//获取所有频道列表
export function get_allChannels() {

    return requestQ({
        url: 'channels',
        method: 'get',
        
    })
}

//设置用户频道列表
export function edit_allChannels(data) {

    return requestQ({
        url: 'user/channels',
        method: 'PUT',
        data
    })
}

//删除用户频道
export function del_allChannels(data) {

    return requestQ({
        url: 'user/channels',
        method: 'DELETE',
        data
    })
}