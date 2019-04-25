import 'package:flutter/material.dart';
import '../model/category.dart';

//分类页面_左侧大类_切换时的状态管理provide
class ChildCategory with ChangeNotifier{
  List<BxMallSubDto> childCategoryList = [];

  //改变childCategoryList的方法
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
}