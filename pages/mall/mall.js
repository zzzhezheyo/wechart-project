// pages/mall/mall.js
import ajax from '../../request/ajax.js'

Page({
  refreshList(){
    this.setData({
      start:0,
      products:[]
    })
  },
  loadMore() {
    this.getProducts()
  },
  changeCate(e){
    // console.log(e)
    this.setData({
      currentCatedId: e.currentTarget.dataset.id,
      start:0,
      products:[]
    },()=>{
      this.getProducts()
    })
  },

  getProducts(){
    ajax.get(`/api/tab/${this.data.currentCatedId}?start=${this.data.start}`)
      .then(resp => {
        const products = this.data.products.concat(resp.data.data.items.list)
        const start = resp.data.data.items.nextIndex
        const isEnd = resp.data.data.items.isEnd
        console.log(products)
        this.setData({
          products,
          start,
          isEnd
        })
      })
  },
  /**
   * 页面的初始数据
   */
  data: {
    navs:[],
    currentCatedId:null,
    products:[],
    start: 0,
    isEnd:true
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    ajax.get('/api/tabs?sa=')
      .then(res=>{
        // console.log(res.data.data.list.slice(1))
        const navs = res.data.data.list.slice(1)
        if(res.data.code===200){
          this.setData({
            navs,
            currentCatedId:navs[0].id
          },()=>{
            this.getProducts()
          })
        }
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})