

let formatDateObj = {};
/*
* @param1 [ Number ]  0-6
*
* return 一
* */
formatDateObj.WeekNumTransformToChineseNum = function ( num ) {

  if( typeof num !== "number" ) {
    console.log( num + "格式化成周几出错，类型不是number");
    return num;
  }

  let chineseNum = null;

  if( num === 0 ) {
    chineseNum = "日";
  }

  if( num === 1 ) {
    chineseNum = "一";
  }

  if( num === 2 ) {
    chineseNum = "二";
  }

  if( num === 3 ) {
    chineseNum = "三";
  }

  if( num === 4 ) {
    chineseNum = "四";
  }
  if( num === 5 ) {
    chineseNum = "五";
  }

  if( num === 6 ) {
    chineseNum = "六";
  }

  if( chineseNum ) {
    return chineseNum;
  }else {
    return null ;
  }



};


/*
* * @date [ string ] 2019-01-30
*
* return 2019年01月30日
* */
formatDateObj.DateFomatTransformToChineseFomat = function ( date ) {

  if( typeof date !== "string" ) {
    console.log( date + "格式化成年月日出错，类型不是string");
    return date;
  }

  let chineseFormat = null;
  if( date.indexOf("-") < 0 || date.indexOf("/") < 0 ) {
    console.log( "date中不包含-或者/" );
    return date;
  }


};

function colorRgb ( Hex ) {

  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;

  var sColor = Hex.toLocaleLowerCase();

  if( sColor && reg.test(sColor) ){
    if( sColor.length === 4 ){
      var sColorNew = "#";
      for(var i=1; i<4; i+=1){
        sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));
      }
      sColor = sColorNew;
    }
    //处理六位的颜色值
    var sColorChange = [];
    for(var i=1; i<7; i+=2){
      sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));
    }
    return "rgba(" + sColorChange.join(",") + ",.3)";
  }else{
    return sColor;
  }
};


export default {
  formatDateObj: formatDateObj,
  colorRgb: colorRgb
}
