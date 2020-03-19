import requestQ from '@/utilis/request'

//todo  获取新闻文章评论数组方法
export function get_comments(params) {

    return requestQ({
        url: "comments",
        method: 'get',
        params
    })
}



//todo  添加评论或评论回复
export function add_comments(data) {

    return requestQ({
        url: "comments",
        method: 'post',
        data
    })
}



//todo 对评论或评论回复点赞
export function likings_comments(data) {

    return requestQ({
        url: "comment/likings",
        method: 'POST',
        data
    })
}