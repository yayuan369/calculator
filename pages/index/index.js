//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    screenData: "0",
    idc: "clear",
    iddiv: "÷",
    idx: "×",
    idb: "back",

    id7: "7",
    id8: "8",
    id9: "9",

    id4: "4",
    id5: "5",
    id6: "6",
    idj: "－",

    id1: "1",
    id2: "2",
    id3: "3",
    idadd: "＋",

    id0: "0",
    idd: ".",
    ide: "＝",
    iconType: 'waiting_circle',
    iconColor: '#1919CE',

    logs: [], //历史记录

    operaSymbo: {
      "＋": "+",
      "－": "-",
      "×": "*",
      "÷": "/",
      ".": "."
    },
    lastIsOperaSymbo: false,

    akSize: '50px', //显示的字体大小


  },
  //事件处理函数
  bindViewTap: function() {

  },
  onLoad: function() {

  },
  // 计算机按钮事件
  clickBtn(event) {
    var id = event.target.id; //按钮的值
    if (id == this.data.idc) { //清屏 C
      this.setData({
        "screenData": "0"
      });
      app.globalData.array = [];
      app.globalData.fuhao = [];
      // this.data.arr.length = 0;
      this.setData({
        "akSize": '50px'
      })
    } else if (id == this.data.idb) { //退格←
      var data = this.data.screenData;
      if (data == '0') {
        return;
      }

      if (this.data.screenData.length > 13) {
        this.setData({
          "akSize": '30px'
        })
      } else {
        this.setData({
          "akSize": '50px'
        })
      }

      // 截取字符串
      data = data.substring(0, data.length - 1);
      if (data == "" || data == "0") {
        data = 0;
      }

      this.setData({
        "screenData": data
      })
      // this.data.arr.pop();
    } else if (id == this.data.idt) { //正负号
      var data = this.data.screenData;
      if (data == '0') {
        return;
      }

      //返回在第0个位置的字符
      var firstWord = data.charAt(0);
      if (firstWord == '-') {
        data = data.substr(1); //截取第一位之后的字符串
        // this.data.arr.shift(); //删除第一个元素，并返回第一个元素的值
      } else {
        data = "-" + data;
        // this.data.arr.unshift("-"); //向数组的开头添加一个或更多元素，并返回新的长度
      }

      this.setData({
        "screenData": data
      })
    } else if (id == this.data.ide) { //等于号
      var data = this.data.screenData;
      console.log('datat==', this.data.screenData)
      if (data == '0') {
        return;
      }
      if (this.data.screenData.length > 13) {
        this.setData({
          "akSize": '30px'
        })
      } else {
        this.setData({
          "akSize": '50px'
        })
      }

      var lastWOrd = data.charAt(data.length);
      if (isNaN(lastWOrd)) {
        return;
      }
      var num = "";
      var lastOperater = "";
      var newArr = this.data.screenData;
      var operator = [];
      for (var i in newArr) {
        if ((isNaN(newArr[i]) == false || newArr[i] == this.data.idd) || newArr[i] == this.data.idt) {
          num += newArr[i];
        } else {
          lastOperater = newArr[i];
          operator.push(num);
          operator.push(newArr[i]);
          num = '';
        }
      }

      operator.push(Number(num));
      // console.log('sad', operator);

      var res = Number(operator[0]) * 1.0;

      var ask = operator;
      console.log('ask', ask);
      for (var h = 0; h < ask.length; h++) {
        if (h % 2 == 0) {
          if (ask[h]!="") {
            app.globalData.array.push(ask[h]);
          }
        } else {
          if (ask[h]!="") {
            app.globalData.fuhao.push(ask[h]);
          }
        }
      }

      console.log('array', app.globalData.array)
      console.log('fuhao', app.globalData.fuhao)

      //更换乘除号
      for (var h = 0; h < app.globalData.fuhao.length; h++) {
        if (app.globalData.fuhao[h] == "×") {
          app.globalData.fuhao[h] = "*";
        } else if (app.globalData.fuhao[h] == "÷") {
          app.globalData.fuhao[h] = "/";
        }
      }
      //先乘除取余，后加减
      this.jisuan_1();
      this.jisuan_2();
      res = app.globalData.array[0];

      // 清空上一次数据
      app.globalData.array = [];
      app.globalData.fuhao = [];


      //存储历史记录
      this.data.logs.push(data + "=" + res);
      wx.setStorageSync("calcLogs", this.data.logs);

      // this.data.arr.length = 0;
      // this.data.arr.push(res);
      this.setData({
        "screenData": res + ""
      })
      operator=[];
    } else {
      if (this.data.operaSymbo[id]) { //如果是符号+-*/
        if (this.data.lastIsOperaSymbo || this.data.screenData == "0") {
          return;
        }
      }

      var ak = this.data.screenData;
      var data;
      if (ak == 0) {
        data = id;
      } else {
        data = ak + id;
      }
      this.setData({
        "screenData": data
      });
      // this.data.arr.push(id);

      if (this.data.operaSymbo[id]) {
        this.setData({
          "lastIsOperaSymbo": true
        });
      } else {
        this.setData({
          "lastIsOperaSymbo": false
        });
      }
    }


  },
  //将数组往前移一位
  yidong() {
    console.log('22')
    //数字前移
    for (var a = 0; a < app.globalData.array.length; a++) {
      if ((a + 1) < app.globalData.array.length) {
        if (app.globalData.array[a] == "" && app.globalData.array[a + 1] != "") {
          app.globalData.array[a] = app.globalData.array[a + 1];
          app.globalData.array[a + 1] = "";
        }
      }
    }
    //清除符号数组空值
    for (var i = 0; i < app.globalData.fuhao.length; i++) {
      if (app.globalData.fuhao[i] == "" || typeof(app.globalData.fuhao[i]) == "undefined") {
        app.globalData.fuhao.splice(i, 1);
        i = i - 1;
      }
    }
  },
  //先算乘除
  jisuan_1() {
    for (var a = 0; a < app.globalData.fuhao.length; a++) {
      for (var h = 0; h < app.globalData.array.length; h++) {
        if (app.globalData.fuhao[a] == "*") {
          app.globalData.array[a] = parseFloat(app.globalData.array[a]) * parseFloat(app.globalData.array[a + 1]);
          app.globalData.array[a + 1] = "";
          app.globalData.fuhao[a] = "";
          this.yidong();
        } else if (app.globalData.fuhao[a] == "/") {
          app.globalData.array[a] = parseFloat(app.globalData.array[a]) / parseFloat(app.globalData.array[a + 1]);
          app.globalData.array[a + 1] = "";
          app.globalData.fuhao[a] = "";
          this.yidong();
        }
      }
    }
  },
  //再算加减
  jisuan_2() {
    for (var a = 0; a < app.globalData.fuhao.length; a++) {
      for (var h = 0; h < app.globalData.array.length; h++) {
        if (app.globalData.fuhao[a] == "＋") {
          app.globalData.array[a] = parseFloat(app.globalData.array[a]) + parseFloat(app.globalData.array[a + 1]);
          app.globalData.array[a + 1] = "";
          app.globalData.fuhao[a] = "";
          this.yidong();
        } else if (app.globalData.fuhao[a] == "－") {
          app.globalData.array[a] = parseFloat(app.globalData.array[a]) - parseFloat(app.globalData.array[a + 1]);
          app.globalData.array[a + 1] = "";
          app.globalData.fuhao[a] = "";

          this.yidong();
        }
      }
    }
    console.log('123333', app.globalData.array, app.globalData.fuhao)
  },
  //历史记录
  history() {
    wx.navigateTo({
      url: '../history/history'
    })
  }

})