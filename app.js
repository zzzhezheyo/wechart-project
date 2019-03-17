//app.js
import store from './redux/store.js'
App({
  onLaunch: function () {
    this.setBadge()
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  },
  cart: wx.getStorageSync("lk-cart") || [],
  setBadge(){
    const cart=wx.getStorageSync("lk-cart")||[]
    if(!cart.length){
      return;
    }
    const total = cart.reduce((result, item) => {
      result += item.count;
      return result;
    }, 0)
    wx.setTabBarBadge({
      index: 2,
      text: total.toString(),
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  addGlobalCart(productInfo){
    const isInCart =this.cart.some(item=>item.id===productInfo.id)
    if(isInCart){
      this.cart=this.cart.map(item=>{
        if (item.id === productInfo.id) {
          item.count += 1
        }
        return item;
      })
    }else{
      this.cart.push({
        ...productInfo,
        count:1
      })
    }
    wx.setStorageSync('lk-cart', this.cart) 
    this.setBadge() 
  }
})