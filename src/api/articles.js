//!封装获取新闻列表的接口

import requestQ from '@/utilis/request'

//获取新闻数组信息

export function get_articles(params) {

    return requestQ({
        url: 'http://ttapi.research.itcast.cn/app/v1_1/articles',
        method: 'get',
        params
    })
}



//对文章不喜欢
export function dislikes_articles(data) {

    return requestQ({
        url: 'article/dislikes',
        method: 'post',
        data
    })
}


//拉黑作者
export function black_user(data) {

    return requestQ({
        url: 'user/blacklists',
        method: 'post',
        data
    })
}

//举报文章
export function reports_article(data) {

    return requestQ({
        url: 'article/reports',
        method: 'post',
        data
    })
}