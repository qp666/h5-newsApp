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

//todo 获取自己信息
export function get_user() {

    return requestQ({
        url: 'user',
        method: 'get',
    })
}


//todo 获取自己其他信息
export function get_profile() {

    return requestQ({
        url: 'user/profile',
        method: 'get',
    })
}

//todo  上传用户头像图片
export function get_user_photo(data) {

    /* 上传文件直接传是没用的,要通过FormData这个对象来传递文件 */

    let fm = new FormData();

    fm.append('photo', data.photo)
    //给新创建的FormData添加一个属性名为photo, 值为传进来data里的photo

    return requestQ({
        url: 'user/photo',
        method: 'PATCH',
        data: fm
        //这时候的data要传fm才能上传成功
    })
}

//todo 保存修改后的用户信息
export function edit_profile(data) {

    return requestQ({
        url: 'user/profile',
        method: 'PATCH',
        data
    })
}