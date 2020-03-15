//!封装搜索事件的接口

import requestQ from '@/utilis/request'

//获取新闻数组信息

export function get_suggestion(params) {

    return requestQ({
        url: 'suggestion',
        method: 'get',
        params
    })
}


