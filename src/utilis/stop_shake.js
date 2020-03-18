export function stop_shake(callback, time) {

    // console.log('123');

    let timerID = null;
    // console.log(callback);
    // console.log(time);
    return function () {
        // console.log(timerID); //这里每一次都是null

        clearTimeout(timerID)
        // 把要执行的代码打包到计时器里removeToken
        timerID = setTimeout(callback, time);
        // console.log('1',timerID);

    }
}