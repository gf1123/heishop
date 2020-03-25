// component/tabs/tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    name:"d"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTabs(e){
      // console.log(e)
      let index =e.currentTarget.dataset.index;

      this.triggerEvent("handlestab",{index})
    }

  }
})
