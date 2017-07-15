/**
 * utils.js
 * @authors ZiQiangWang
 * @email   814120507@qq.com
 * @date    2017-07-07 14:20:30
 */


//进入全屏
export const requestFullScreen = ()=> {
    var de = document.documentElement;
    if (de.requestFullscreen) {
        de.requestFullscreen();
    } else if (de.mozRequestFullScreen) {
        de.mozRequestFullScreen();
    } else if (de.webkitRequestFullScreen) {
        de.webkitRequestFullScreen();
    }
};
//退出全屏
export const exitFullscreen = ()=> {
    var de = document;
    if (de.exitFullscreen) {
        de.exitFullscreen();
    } else if (de.mozCancelFullScreen) {
        de.mozCancelFullScreen();
    } else if (de.webkitCancelFullScreen) {
        de.webkitCancelFullScreen();
    }
};

// 判断是否是全屏状态
export const checkFull = ()=> {
    var isFull =  document.fullscreenEnabled || window.fullScreen || document.webkitIsFullScreen || document.msFullscreenEnabled;
    return isFull;
};


