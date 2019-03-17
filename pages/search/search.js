// pages/search/search.js
import ajax from '../../request/ajax.js'
Page({
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false,
      hasResult: false,
      inputVal: [],
      localSearch: wx.getStorageSync('search') || []
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  doSearch() {
    let localSearch = wx.getStorageSync('search') || []
    const isInLocal = localSearch.some((item) => {
      return item.word === this.data.inputVal
    })
    console.log(isInLocal)
    if (isInLocal) {
      localSearch = localSearch.map(item => {
        if (item.word === this.data.inputVal) {
          item.times += 1
        }
        return item
      })
    } else {
      localSearch.push({
        word: this.data.inputVal,
        times: 1
      })
    }
    wx.setStorageSync('search', localSearch)
    ajax.get(`/api/search?word=${this.data.inputVal}&start=0&sort=0&couponOnly=NaN&minPrice=0&maxPrice=99999`)
    .then(res=>{
      this.setData({
        hasResult: true,
        result: res.data.data.list
      })
    })
  },
  onKeyWordsTap(e){
    this.setData({
      inputShowed:true,
      inputVal: e.currentTarget.dataset.value
    },()=>{
      this.doSearch()
    })
  },

  getHotSearch(){
    ajax.get('/api/search/home')
      .then(resp=>{
        this.setData({
           hotSearch:resp.data.data.hotWords
        })
      })
  },
  renderLocalSearch(){

  },

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    hotSearch:[],
    result:[],
    hasResult:false,
    localSearch: wx.getStorageSync('search') || []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHotSearch()
    this.renderLocalSearch()
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