let globalTips = {};

globalTips.favoriteButtonStatus = {
  showAllHotelInfo     : "全部",
  showEvaluateHotelInfo: "evaluate",
  showWaitHotelInfo    : "waitHotel"

};

globalTips.orderStatus = {
  waitHotel      : 1, // 待入住
  alreadyIn      : 2, // 已入住
  evaluate       : 3, // 待评价
  alreadyEvaluate: 4, // 已评价
  cancelOrder    : 5  // 已取消
};

//type的值
globalTips.orderStatusTips = {

   1 : "waitHotel",
   2 : "alreadyIn",
   3 : "evaluate",
   4 : "alreadyEvaluate",
   5 : "cancelOrder",

};

globalTips.orderStatusChineseTips = {

  1 : "待入住",
  2 : "已入住",
  3 : "待评价",
  4 : "已评价",
  5 : "已取消",

};

globalTips.orderStatusBtnsTips = {

  1 : {
    btn1: {
      text: "取消订单", //待入住的话不可以取消 不可以删除 不可以评价
      hide: true,
      clickEvent: "cancelOrder"
    },
    btn2: {
      text: "删除", //待入住的话不可以取消 不可以删除 不可以评价
      hide: false,
      clickEvent: "deleteOrder"

    }

  },
  2 : {
    btn1: {
      text: "删除", //已入住的话不可以取消 不可以删除 不可以评价
      hide: false,
      clickEvent: "deleteOrder"

    },
    btn2: {
      text: "去评价", //待入住的话不可以取消 不可以删除 不可以评价
      hide: false,
      clickEvent: "goEvaluate"
    }

  },
  3 : {
    btn1: {
      text: "删除", //已入住的话不可以取消 不可以删除 不可以评价
      hide: false,
      clickEvent: "deleteOrder"
    },
    btn2: {
      text: "去评价", //待入住的话不可以取消 不可以删除 不可以评价
      hide: false,
      clickEvent: "goEvaluate"

    }

  },
  4 :  {
    btn1: {
      text: "取消", //已入住的话不可以取消 不可以删除 不可以评价
      hide: true,
      clickEvent: "cancelOrder"

    },
    btn2: {
      text: "去评价", //待入住的话不可以取消 不可以删除 不可以评价
      hide: true,
      clickEvent: "goEvaluate"

    }

  },
  5 : {
    btn1: {
      text: "删除", //已入住的话不可以取消 不可以删除 不可以评价
      hide: true,
      clickEvent: "deleteOrder"
    },
    btn2: {
      text: "重新预定", //待入住的话不可以取消 不可以删除 不可以评价
      hide: true,
      clickEvent: "goHotelDetail"

    }

  }

}



export default globalTips;
