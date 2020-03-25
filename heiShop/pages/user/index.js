// pages/user/index.js
Page({
  handleGetUserInfo(e){
    console.log(e);
    // 把用户信息放到缓存中
    let userInfo =e.detail.userInfo;
    wx.setStorageSync("userinfo", userInfo);
    // 返回上一页
    wx.navigateBack({
      delta:1
    });
  }
})