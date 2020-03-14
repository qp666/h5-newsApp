//!封装获取新闻列表的接口

import requestQ from '@/utilis/request'

//获取用户频道推荐信息

export function get_articles(params) {

    return requestQ({
        url: 'http://ttapi.research.itcast.cn/app/v1_1/articles',
        method: 'get',
        params
    })
}

