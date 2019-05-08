import 'package:flutter/material.dart';
import 'package:provide/provide.dart';
import '../../provide/details_info.dart';//数据
import 'package:flutter_screenutil/flutter_screenutil.dart';//屏幕适配工具

class DetailsTopArea extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Provide<DetailsInfoProvide>(
      builder: (context,child,val){
        var goodsInfo = Provide.value<DetailsInfoProvide>(context).goodsInfo.data.goodInfo;
        if(goodsInfo != null){
          return Container(
            color: Colors.white,//背景色白色
            child: Column(
              children: <Widget>[
                _goodsImage(goodsInfo.image1),
                _goodsname(goodsInfo.goodsName),
                _goodsNum(goodsInfo.goodsSerialNumber),
                _goodsPrice(goodsInfo.presentPrice,goodsInfo.oriPrice),
              ],
            ),
          );
        }else{
          return Text('正在加载中.........');
        }
      },
    );
  }

  //商品图片
  Widget _goodsImage(url){
    return Image.network(
      url,
      width: ScreenUtil().setWidth(740),
    );
  }

  //商品名称
  Widget _goodsname(name){

    return Container(
      width: ScreenUtil().setWidth(740),
      padding: EdgeInsets.only(left: 15.0),
      child: Text(
        name,
        style:TextStyle(
          fontSize:ScreenUtil().setSp(30)
        )
      ),
    );
  }

  //商品编号
  Widget _goodsNum(num){
    return Container(
      width: ScreenUtil().setWidth(730),
      padding: EdgeInsets.only(left: 15.0),
      margin: EdgeInsets.only(top: 15.0),
      child: Text(
        '编号：${num}',
        style:TextStyle(
          color:Colors.black38,
        )
      ),
    );
  }

  //商品价格
  Widget _goodsPrice(price,originalPrice){
    return Container(
      width: ScreenUtil().setWidth(730),
      padding: EdgeInsets.only(left: 15.0,bottom: 10.0),
      margin: EdgeInsets.only(top: 8.0),
      child: Row(
        children: <Widget>[
          _goodsCurrentPrice(price),
          _goodsOriginalPrice(originalPrice),
        ],
      ),
    );
  }

  Widget _goodsCurrentPrice(presentPrice){
    return Container(
      margin: EdgeInsets.only(top: 4.0),
      child: Text(
              '￥${presentPrice}',
              style: TextStyle(
                fontSize: ScreenUtil().setSp(40),
                color: Colors.pinkAccent
                ),
            ),
    );
    
  }

  Widget _goodsOriginalPrice(originalPrice){
    return Container(
      margin: EdgeInsets.only(left: 15),
      child: Row(
        children: <Widget>[
          Text('市场价:   '),
          Text(
                '${originalPrice}',
                style:TextStyle(color: Colors.black38,decoration: TextDecoration.lineThrough)
              ),
        ],
      ),
    );
  }


}

