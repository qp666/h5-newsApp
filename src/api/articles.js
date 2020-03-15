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