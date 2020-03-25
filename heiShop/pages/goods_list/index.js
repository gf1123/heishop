// pages/goods_list/index.js
import { rquest, request } from "../../request/index.js"
// 1 用户上滑页面 滚动条触底 开始加载下一页数据
//  1找到滚动条触底事件 
//  2判断还有没有下一页数据
//   1 获取总页数  总页数 =Math.ceil(总条数 / 页容量 pagesize)
//   2获取到当前的页码 pagenum
//   3判断一下 当前的页码是否大于等于 总页数
//   表示 没有下一页数据

//  3假如没有下一页数据 弹出一个提示
//  4假如还有下一页数据 来加载下一页数据
// 1 当前页码++
// 2 重新发送请求
// 3 数据请求回来 要对data中的数组 进行拼接 而不是全部替换!

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      { id: 0, value: "综合", isActive: true },
      { id: 1, value: "销量", isActive: false },
      { id: 2, value: "价格", isActive: false }
    ],
    goodsList: [],
    // 接口要的参数
    QueryParams: {
      query: "",
      // 商品分类传过来的参数
      cid: "",
      //当前页码，也就是第几页
      pagenum:1,
      // 页容量，也就是每页多少条数据
      pagesize: 10
    },
    // 总页数,一共是多少页  ，总结：一共 4【totalPages】页， 每页10【pagesize】条数据 ，当前数据是第一【pagenum】页
    totalPages: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 从商品分类返回来的参数
    this.data.QueryParams.cid = options.cid;
    this.getGoodsList();
  },
  //获取上林列表数据
  getGoodsList() {
    // 拼接参数
    request({ url: "/goods/search?cid=" + this.data.QueryParams.cid})
      .then(result => {
        //获取后台总条数
        let total = result.data.message.total;
        //计算总页数(存在totalPages) Math.ceil为向上取整
        this.data.totalPages = Math.ceil(40 / this.data.QueryParams.pagesize);
           console.log(this.data.totalPages,"totalPages");
        this.setData({
          // 拼接数据     旧数组   新数组
          goodsList: [...this.data.goodsList, ...result.data.message.goods]
          // goodsList:result.data.message.goods
        })

      })
  },
  // 页面上滑 滚动条触底事件
  onReachBottom() {
    console.log("onReachBottom")
    //1 判断还有没有下一页数据
    if (this.data.QueryParams.pagenum >=  this.data.totalPages) {
      // 没有下一页数据
      wx.showToast({ title: "没有下一页数据了" });
    } else {
      // 还有下一页数据
      this.data.QueryParams.pagenum ++;
      console.log(this.data.QueryParams.pagenum,"pagenum");
      // 再次调用
      this.getGoodsList();
    }
  },
  // 从子组件传递过来的
  tabsHandle(e) {
    //1获取点击的索引
    let { index } = e.detail;
    //2修改原数组
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs
    })
  }
})