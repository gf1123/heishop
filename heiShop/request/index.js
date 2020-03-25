// 封装微信请求代码 
// 同时发送异步请求的次数
let ajaxTimes = 0;
export const request = (params) => {
  ajaxTimes++;
  //显示加载中
  wx.showLoading({
    title: '加载中',
  })
  // 定义公共的url
  const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1";
  return new Promise((resolve, reject) => {
    wx.request({
      // 解构参数
      ...params,
      // 拼接路径
      url: baseUrl + params.url,
      success: (result) => {
        resolve(result);
      },
      fail: (err) => {
        reject(err);
      },
      complete: () => {
        //关闭正在等待的图标
        ajaxTimes--;
        // 判断是代表同时发送请求之后只有最后一个请求完成时才关闭图标
        if (ajaxTimes === 0) {
          wx: wx.hideLoading();
        }
      }
    })
  })

}