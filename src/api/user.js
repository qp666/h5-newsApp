import requestQ from '@/utilis/request'

//todo 关注用户
export function follow_user(data) {

    return requestQ({
        url: "user/followings",
        method: 'post',
        data
    })
}


//todo 取消关注用户
export function follow_no(data) {

    return requestQ({
        url: `user/followings/${data.aut_id}`,
        method: 'DELETE',
    })
}