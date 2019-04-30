import 'package:flutter/material.dart';
import '../model/categoryGoodsList.dart';

//变化的是右侧商品列表
class CategoryGoodsListProvide with ChangeNotifier{
  List<CategoryListData> goodsList = [];

  //点击大类时，更换商品列表
  getGoodsList(List<CategoryListData> list){
    goodsList=list;
    notifyListeners();
  }

  getMoreList(List<CategoryListData> list){
    goodsList.addAll(list);
    notifyListeners();
  }

//说明：
//1、分类页面，我想要点击左侧大类列表，改变右侧商品的列表
//2、在点击事件里面请求右侧的商品列表信息，调用Provide.value<CategoryGoodsListProvide>(context)获取状态state,
//   然后调用getGoodList(goodsList.data)方法，将请求到的list传过来
//3、在需要改变刷新的widget外调用Provide<CategoryGoodsListProvide>(获取状态state，
//   然后用builder重新构建此widget;
//4、页面初始化时需要请求一次，避免第一次显示的空白
}