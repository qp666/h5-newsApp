import requestQ from '@/utilis/request'

//todo  获取频道新闻方法
export function get_articles(params) {

    return requestQ({
        url: "http://ttapi.research.itcast.cn/app/v1_1/articles",
        method: 'get',
        params
    })
}