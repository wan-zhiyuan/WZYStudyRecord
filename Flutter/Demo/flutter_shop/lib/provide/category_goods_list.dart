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

//说明：
//分类页面，我想要点击左侧大类列表，改变右侧商品的列表
//在点击事件里面请求右侧的商品列表信息，并调用CategoryGoodsListProvide的getGoodList()方法，将请求到的list传过来
//Provide.value<CategoryGoodsListProvide>(context).getGoodList(goodsList.data);
//需要改变刷新的widget外包裹Provide<CategoryGoodsListProvide>(
//页面初始化时需要请求一次，避免第一次显示的空白
}