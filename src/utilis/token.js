//封装token方法


//取token方法
export function getToken(key) {
   return JSON.parse(window.localStorage.getItem(key)) //从window里面取出token
}

//存token方法
export function setToken(key, val) {
   window.localStorage.setItem(key, val) //从window里面存入token
}

//删除token方法
export function removeToken(key) {
   window.localStorage.removeItem(key) //从window里面删除token
}

resultsList: [{
   "title": "\u987a\u4e30\u79d1\u6280\u9762\u8bd5\uff089.26\uff09",
   "aut_id": 3,
   "pubdate": "2018-11-29T15:57:32",
   "ch_id": 9,
   "cover": {
      "type": 0,
      "images": []
   },
   "is_top": 0,
   "art_id": 65808,
   "aut_name": "18811179159",
   "comm_count": 0,
   "like_count": 0,
   "collect_count": 0
}, {
   "title": "\u65b0\u79d1\u6280\u5047\u80a2\u80fd\u8ba9\u88ab\u622a\u80a2\u8005\u66f4\u81ea\u5982\u5730\u5b8c\u6210\u65e5\u5e38\u6d3b\u52a8",
   "aut_id": 1,
   "pubdate": "2018-11-29T15:47:04",
   "ch_id": 22,
   "cover": {
      "type": 1,
      "images": ["https://pic1.zhimg.com/v2-3f30ac928cd88b3cb80d4a190b17c220.jpg"]
   },
   "is_top": 0,
   "art_id": 52977,
   "aut_name": "\u61a8\u6279",
   "comm_count": 0,
   "like_count": 0,
   "collect_count": 0
}, {
   "title": "\u51b0\u7bb1\u5230\u5e95\u662f\u600e\u6837\u7684\u73b0\u4ee3\u5de5\u4e1a\u79d1\u6280\u7684\u6210\u679c\uff1f",
   "aut_id": 2,
   "pubdate": "2018-11-29T15:48:01",
   "ch_id": 22,
   "cover": {
      "type": 1,
      "images": ["https://pic1.zhimg.com/v2-00fd94eb71ba129c28225899059a803a.jpg"]
   },
   "is_top": 0,
   "art_id": 54167,
   "aut_name": "13552285417",
   "comm_count": 0,
   "like_count": 0,
   "collect_count": 0
}, {
   "title": "8\u4e2a\u7edd\u5bf9\u4e25\u8083\u8ba4\u771f\u7684\u751f\u6d3b\u9ed1\u79d1\u6280",
   "aut_id": 3,
   "pubdate": "2018-11-29T15:47:10",
   "ch_id": 22,
   "cover": {
      "type": 1,
      "images": ["https://pic3.zhimg.com/v2-21dd27b329bc8a650c160e9fbb59df55.jpg"]
   },
   "is_top": 0,
   "art_id": 53110,
   "aut_name": "18811179159",
   "comm_count": 0,
   "like_count": 0,
   "collect_count": 0
}, {
   "title": "8\u4e2a\u4f60\u7edd\u5bf9\u60f3\u8981\u7684\u79d1\u6280\u53d1\u660e",
   "aut_id": 2,
   "pubdate": "2018-11-29T15:47:22",
   "ch_id": 22,
   "cover": {
      "type": 1,
      "images": ["https://pic2.zhimg.com/v2-2e8bd68b332cf2309219851be23a64f0.jpg"]
   },
   "is_top": 0,
   "art_id": 53326,
   "aut_name": "13552285417",
   "comm_count": 0,
   "like_count": 0,
   "collect_count": 0
}, {
   "title": "\u5341\u4f4d\u4f60\u9700\u8981\u77e5\u9053\u7684\u79d1\u6280\u5927\u4f6c",
   "aut_id": 2,
   "pubdate": "2018-11-29T15:47:22",
   "ch_id": 22,
   "cover": {
      "type": 1,
      "images": ["https://pic2.zhimg.com/80/v2-6e35b8e07345af5680e6919fbd27da69_b.jpg"]
   },
   "is_top": 0,
   "art_id": 53330,
   "aut_name": "13552285417",
   "comm_count": 1,
   "like_count": 0,
   "collect_count": 0
}, {
   "title": "\u98de\u8f69\u79d1\u6280\u2014\u2014\u95ea\u6cb9\u4fa0\u56f4\u7ed5\u7528\u6237\u4f53\u9a8c\u8bbe\u8ba1\u7cbe\u7ec6\u5316\u4ea7\u54c1",
   "aut_id": 1,
   "pubdate": "2018-11-29T15:49:28",
   "ch_id": 24,
   "cover": {
      "type": 0,
      "images": []
   },
   "is_top": 0,
   "art_id": 55889,
   "aut_name": "\u61a8\u6279",
   "comm_count": 0,
   "like_count": 0,
   "collect_count": 0
}, {
   "title": "\u623f\u5361\u6e38\u620f\u7814\u53d1\u7684\u9ad8\u901f\u53d1\u5c55-\u6469\u5929\u6e38\u79d1\u6280",
   "aut_id": 3,
   "pubdate": "2018-11-29T15:55:44",
   "ch_id": 13,
   "cover": {
      "type": 0,
      "images": []
   },
   "is_top": 0,
   "art_id": 63628,
   "aut_name": "18811179159",
   "comm_count": 0,
   "like_count": 0,
   "collect_count": 0
}, {
   "title": "Python\u9ed1\u79d1\u6280\uff1a50\u884c\u4ee3\u7801\u8fd0\u7528Python\uff0bOpenCV\u5b9e\u73b0\u4eba\u8138\u8ffd\u8e2a+\u8be6\u7ec6\u6559\u7a0b+\u5feb\u901f\u5165\u95e8+\u56fe\u50cf\u8bc6\u522b+\u4eba\u8138\u8bc6\u522b+\u5927\u795e\u8bb2\u89e3",
   "aut_id": 1,
   "pubdate": "2018-11-29T17:07:55",
   "ch_id": 13,
   "cover": {
      "type": 3,
      "images": ["http://inews.gtimg.com/newsapp_match/0/3417358907/0", "http://inews.gtimg.com/newsapp_match/0/3417356311/0", "http://inews.gtimg.com/newsapp_match/0/3417368019/0"]
   },
   "is_top": 0,
   "art_id": 128282,
   "aut_name": "\u61a8\u6279",
   "comm_count": 0,
   "like_count": 0,
   "collect_count": 0
}, {
   "title": "\u4f73\u90fd\u79d1\u6280\u9686\u5316\u79d1\u6280\u65b0\u601d\u8003",
   "aut_id": 2,
   "pubdate": "2018-11-29T15:58:33",
   "ch_id": 13,
   "cover": {
      "type": 0,
      "images": []
   },
   "is_top": 0,
   "art_id": 67032,
   "aut_name": "13552285417",
   "comm_count": 0,
   "like_count": 0,
   "collect_count": 0
}]