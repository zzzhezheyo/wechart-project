import ajax from '../../request/ajax.js'
Page({
  tosearch(){
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },
  onLoad() {
    wx.getLocation({
      type: 'wgs84',
      altitude: true,
      success: (res) => {
        wx.request({
          url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${res.latitude},${res.longitude}&key=TBIBZ-KWRRX-LH24K-7PH2L-PI5UJ-LZB5Q&get_poi=1`,
          success: (res) => {
            this.setData({
              city: res.data.result.address_component.city
            })
          },
          fail: function (res) { },
          complete: function (res) { },
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  data: {
    city:'',
    imgsURL: [
     'demo-text-1',
     'demo-text-2', 
     'demo-text-3'
     ],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    circular: true,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
  }
})
