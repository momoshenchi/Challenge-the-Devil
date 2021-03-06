const app = getApp()
Page({
  data: {
    name: null,
    sex: null,
    age: null,
    sexs: [
      {num: '0', value: "男生", checked: false},
      {num: '1', value: "女生", checked: false},
    ],
    show:false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData:['5','6','7','8','9','10','11','12'],//下拉列表的数据
    index:0,//选择的下拉列表下标
  },
  //更新信息
  commit:function () {
    let that = this
    //更新魔法师信息
    wx.request({
      url: 'https://www.yuan619.xyz:8887/user/updateUserinfo',
      header: {
       "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        openid: app.globalData.openid,
        magicName: that.data.name,
        sex: that.data.sex,
        age: that.data.age
      },
      success: function (res) {
       console.log(res)
       if(res){
          console.log("魔法师信息更新成功!")
       }
      },
      fail: function (res) {
       console.log(res)
       if(res == null){
         console.log("魔法师信息更新失败!")
       }
      }
    })
    app.globalData.sex = this.data.sex
    wx.showToast({
      title: '保存成功!',
      icon: 'success',
      image: '',
      duration: 700,
      mask: false,
      success: (result)=>{},
      fail: ()=>{},
      complete: ()=>{}
    });
    setTimeout(() => {
      wx.switchTab({
        url: '/pages/my/my',
      })
    }, 700)
  },
  //得到输入的姓名
  nameInput:function(e){
    this.setData({
      name:e.detail.value
    })
  },
  //显示下拉
  selectTap(){
    this.setData({
      show: !this.data.show
    });
  },
  //改变性别值
  radioChange:function(e){
    let that = this
    console.log("当前性别:" + e.detail.value)
    if(e.detail.value == '0'){
      that.setData({
        sex: 1
      })
    }
    else{
      that.setData({
        sex: 2
      })
    }
  },
  // 点击下拉列表
  optionTap(e){
    let Index=e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.setData({
      index:Index,
      show:!this.data.show,
      age:this.data.selectData[Index]
    });
  },
  onLoad: function (options) {
    let that = this
    wx.request({
      url: 'https://www.yuan619.xyz:8887/user/byopenid',
      data: {
        openid: app.globalData.openid
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        let user = res.data.list
        console.log("查询到用户信息", user)
        that.setData({
          name: user.userName,
          sex: user.sex,
          age: user.age,
          index: user.age - 5
        })
        if (user.sex == 1) {
          that.setData({
            sexs: [
              {num: '0', value: "男生", checked: true},
              {num: '1', value: "女生", checked: false},
            ]
          })
        } else if (user.sex == 2) {
          that.setData({
            sexs: [
              {num: '0', value: "男生", checked: false},
              {num: '1', value: "女生", checked: true},
            ],
            personPosition: '-619'
          })
        }
      },
      fail: function (res) {
        console.log("...fail...");
      }
    })
  },
  onShow: function () {

  },
})