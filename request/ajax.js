const baseURL ="http://www.xiongmaoyouxuan.com"

class Ajax {
  get(url,data={}){
    wx.showLoading({
      title: '加载中...',
      mask:true
    })
    return new Promise((resolve,reject)=>{
      wx.request({
        url: baseURL+url,
        data,
        method: 'GET',
        dataType: 'json',
        success: function(res) {
          resolve(res)
        },
        fail: function(res) {
          wx.showToast({
            title: '加载出错',
            icon: 'none',
          })
        },
        complete: function(res) {
          wx.hideLoading()
        },
      })
    })
  }
}

export default new Ajax()