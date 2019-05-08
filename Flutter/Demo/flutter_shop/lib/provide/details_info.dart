import 'package:flutter/material.dart';
import '../model/details.dart';
import '../service/service_method.dart';
import 'dart:convert';

class DetailsInfoProvide with ChangeNotifier{
  DetailsModle goodsInfo = null;

  bool isLeft = true;
  bool isRight = false;

  //tabbar的切换方法
  changeLeftAndRight(String changeState){
    if (changeState == 'left') {
      isLeft = true;
      isRight = false;
    } else {
      isLeft = false;
      isRight = true;
    }
    notifyListeners();
  }

  //从后台获取商品数据
  getGoodsInfo(String id){
    var formData = {'goodId':id};
    request('getGoodDetailById',formData:formData).then((val){
      var responseData = json.decode(val.toString());
      print(responseData);
      goodsInfo = DetailsModle.fromJson(responseData);
      notifyListeners();
    });

  }

}