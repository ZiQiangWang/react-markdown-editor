/**
 * @authors ZiQiangWang
 * @email   814120507@qq.com
 * @date    2017-07-14 21:36:10
 */

((window,document) => {

  const keepHeight = () => {
    const height = window.innerHeight | document.body.clientHeight;
    const markdown =  document.getElementsByClassName('markdown-editor')[0];
    markdown.style.height = height;
  }

  // keepHeight();
  window.onresize = (e) => {
    keepHeight();
  }

})(window, document);

