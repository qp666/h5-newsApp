import requestQ from '@/utilis/request'

//todo 获取联想建议（自动补全）
export function get_articles(params) {

    return requestQ({
        url: "suggestion",
        method: 'get',
        params
    })
}

