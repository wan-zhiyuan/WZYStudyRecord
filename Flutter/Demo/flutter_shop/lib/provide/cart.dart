import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';

class CartProvide with ChangeNotifier{
  String cartString = "[]";

  save(goodsId,goodsName,count,price,images) async {
    SharedPreferences prefs =  await SharedPreferences.getInstance();
    cartString = prefs.getString('cartInfo');//cartInfo购物车信息
    var temp = cartString==null?[]:json.decode(cartString.toString());
    List<Map> tempList = (temp as List ).cast();
    bool isHave = false;//记录list是否有此商品，默认为false
    int ival=0;

    tempList.forEach((item){ //item指的是tempList的具体的项
      //判断list中是否有此商品，有 count数量+1 ，isHave标识置为true
      if (item['goodsId']==goodsId) {
        tempList[ival]['count']=item['count']+1;
        isHave = true;
      }
      ival++;
    });
    //如果没有此商品
    if (!isHave) {
      tempList.add({
        'goodsId':goodsId,
        'goodsname':goodsName,
        'count':count,
        'price':price,
        'images':images,
      });
    }

    //list转json，json再字符串化
    cartString = json.encode(tempList).toString();
    //字符串再持久化
    print(cartString);
    prefs.setString('cartInfo', cartString);

    notifyListeners();
  }

  remove() async {
    SharedPreferences prefs =  await SharedPreferences.getInstance();
    prefs.remove('cartInfo');
    print('清空完成-----------------------------');
    notifyListeners();
  }

}

