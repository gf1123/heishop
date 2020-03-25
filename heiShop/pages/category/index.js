import {
  rquest,
  request
} from "../../request/index.js"

// pages/category/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //左侧数据
    leftMenuList: [],
    //右侧数据
    rightContent: [],
    // 储存接口数据
    Cate: [],
    // 左侧的点击菜单
    currentIndex: 0,
    // 右侧内容的滚动条，距离顶部的距离
    backTop: 0
  },

  /** 
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    // 获取本地数据
    let Cates = wx.getStorageSync("cates");
    if (!Cates) {
      //不存在 发送请求获取数据
      // 获取分类数据
      this.getCates();
    } else { //存在数据
      if (Date.now() - Cates.time > 1000 * 10) { //当前时间-请求到数据的时间（10s）
        // 获取分类数据,重新送请求
        this.getCates();
      } else {
        console.log("使用了旧数据在缓存拿到的数据，没有超过10s");
        // 可以使用旧数据
        // 全局 拿出缓存里的数据放到全局this.Cates中
        this.Cates = Cates.data;
        // 之后把数据放到this.Cates中
        let leftMenuLists = this.Cates.map(v => v.cat_name);
        //构造右侧的商品数据
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList: leftMenuLists,
          rightContent
        })
      }
    }
  },
  //  1先判断一下本地存储中有没有旧的数据
  //  {time:Date.now(),data;[...]}
  // 2有数据，判断数据是否过期，没过期直接使用旧数据
  // 3.没有数据，发送新的请求

  getCates() {
    request({
      url: "/categories"})
      .then(result => {
        // 获取初始化数据cate
        this.Cates = result.data.message;
        // 1.把接口的数据存入到本地存储中 key,value
        wx.setStorageSync("cates", {
          time: Date.now(),
          data: this.Cates
        });
        //构造左侧的大菜单数据 map遍历之后会形成新的数组
        //找出接口里cat_name的值
        let leftMenuLists = this.Cates.map(v => v.cat_name);
        //构造右侧的商品数据
        let rightContent = this.Cates[0].children;
        // console.log(rightContent)
        this.setData({
          leftMenuList: leftMenuLists,
          rightContent
        })
      })
  },
  handleItemtap(e) {
    //当前的初始化索引
    let currentIndex = this.data.currentIndex;
    // 点击的索引
    let eIndex = e.currentTarget.dataset.index;
    let rightContent = this.Cates[eIndex].children;
    this.setData({
      currentIndex: eIndex,
      rightContent,
      // 重新设置 右侧内容的滚动条距离为0
      backTop: 0
    })


  }

})