import requestQ from '@/utilis/request'

//todo  获取新闻文章数组方法
export function get_articles(params) {

    return requestQ({
        url: "http://ttapi.research.itcast.cn/app/v1_1/articles",
        method: 'get',
        params
    })
}



//todo  不喜欢新闻文章方法
export function dislike_articles(data) {

    return requestQ({
        url: "article/dislikes",
        method: 'POST',
        data
    })
}


//todo  举报文章方法
export function reports_articles(data) {

    return requestQ({
        url: "article/reports",
        method: 'POST',
        data
    })
}




//todo 拉黑用户方法
export function blacklists_articles(data) {

    return requestQ({
        url: "user/blacklists",
        method: 'POST',
        data
    })
}



//todo 获取新闻文章详情
export function this_articles(params) {

    return requestQ({
        url: `articles/${params.art_id}`,
        method: 'GET',

    })
}



//todo  收藏文章
export function shouC_art(data) {

    return requestQ({
        url: 'article/collections',
        method: 'POST',
        data

    })
}

//todo  取消收藏文章
export function no_shouC_art(data) {

    return requestQ({
        url: `article/collections/${data.art_id}`,
        method: 'DELETE',

    })
}

//todo  文章点赞
export function like_art(data) {

    return requestQ({
        url: 'article/likings',
        method: 'POST',
        data

    })
}

//todo  取消文章点赞
export function no_like_art(data) {

    return requestQ({
        url: `article/likings/${data.art_id}`,
        method: 'DELETE',

    })
}


//todo  对文章不喜欢
export function disLike_art(data) {

    return requestQ({
        url: 'article/dislikes',
        method: 'POST',
        data

    })
}

//todo  取消对文章不喜欢
export function no_disLike_art(data) {

    return requestQ({
        url: `article/dislikes/${data.art_id}`,
        method: 'DELETE',

    })
}