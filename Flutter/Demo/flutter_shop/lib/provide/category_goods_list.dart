import 'package:flutter/material.dart';
import '../model/categoryGoodsList.dart';

//变化的是右侧商品列表
class CategoryGoodsListProvide with ChangeNotifier{
  List<CategoryListData> goodsList = [];

  //点击大类时，更换商品列表
  getGoodList(List<CategoryListData> list){
    goodsList = list;
    notifyListeners();
  }

}