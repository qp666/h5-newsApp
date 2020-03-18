import requestQ from '@/utilis/request'

//todo 获取联想建议（自动补全）
export function get_articles(params) {

    return requestQ({
        url: "suggestion",
        method: 'get',
        params
    })
}


//todo 获取搜索结果 
export function get_search(params) {

    return requestQ({
        url: "http://ttapi.research.itcast.cn/app/v1_0/search",
        method: 'get',
        params
    })
}



