// 引入发送请求的方法
import { rquest, request } from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图数组
    swiperList: [],
    // 导航
    cateList: [],
    //楼层
    floorList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //发送异步请求获取轮播图数据
    // 这段代码代表同时发送  异步请求
    this.swiperList();
    // 导航数组
    this.cateList();
    // 楼层
    this.floorList();
  },
  swiperList() {
    // 通过封装的方法发送请求
    request({ url: "/home/swiperdata" })
      .then(result => {
        // result 是成功时返回的参数：res
        this.setData({
          swiperList:result.data.message
        })
      })
  },
  cateList(){
    request({url:"/home/catitems"})
    .then(result=>{
      this.setData({
        cateList:result.data.message
      })
    })
  },
  floorList(){
    request({url:"/home/floordata"})
    .then(result=>{
      console.log(result)
      this.setData({
        floorList:result.data.message
      })
    })
  }
})