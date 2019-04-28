import 'package:flutter/material.dart';
import '../model/category.dart';

//变化的是右侧小类列表信息
class ChildCategory with ChangeNotifier{
  List<BxMallSubDto> childCategoryList = [];

  //改变childCategoryList的方法
  //点击大类时，更改商品小类列表
  getChildCategory(List<BxMallSubDto> list){
    //新建‘全部’子类对象，加入子类集合最前面
    BxMallSubDto all= BxMallSubDto();
    all.mallSubId='00';
    all.mallCategoryId='00';
    all.comments='null';
    all.mallSubName='全部';
    childCategoryList=[all];
    childCategoryList.addAll(list);
    notifyListeners();
  }

//说明：
//分类页面，我想要点击左侧大类列表，改变右侧小类导航
//

}