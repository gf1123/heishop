import {
  rquest,
  request
} from "../../request/index.js"
// pages/goods_detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: {},
    // 商品对象
    goodsInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取商品列表发送过来的参数
    let goods_id = options.goods_id;
    this.getGoodsDetail(goods_id);
  },
  getGoodsDetail(goods_id) {
    request({ url: "/goods/detail?goods_id=" + goods_id })
      .then(result => {
        let goodsList = result.data.message;
        // 方便全屏预览
        this.data.goodsInfo = goodsList;
        this.setData({
          //优化性能 就是接口里有22条而我用的只有4条
          goodsList: {
            goods_name: goodsList.goods_name,
            goods_price: goodsList.goods_price,
            //  iphone部分手机 不识别 webp图片格式
            //替换 webp => jpg 不是正常企业开发模式
            goods_introduce: goodsList.goods_introduce.replace(/\.webp/g, '.jpg'),
            pics: goodsList.pics
          }
        })
      })
  },
  // 轮播图预览
  handlePrevewImage(e) {
    // 先构造要预览的图片数组
    let urls = this.data.goodsInfo.pics.map(v => v.pics_mid);
    // 接收传递过来的图片url
    let current =e.currentTarget.dataset.url;
    wx.previewImage({
      current: current,
      // 解构方式
      urls,
    });
  }
})