import 'package:flutter/material.dart';
import '../model/category.dart';

//变化的是右侧小类列表信息
class ChildCategory with ChangeNotifier{
  List<BxMallSubDto> childCategoryList = [];
  int childIndex = 0;//子类高亮索引 =>每次点击大类 索引要清零
  String categoryId = '4';//大类Id


  //点击大类切换逻辑
  getChildCategory(List<BxMallSubDto> list,String id){

    childIndex=0;

    categoryId=id;
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

  //改变子类索引
  changeChildIndex(index){
    childIndex = index;
    notifyListeners();
  }

//说明：
//1、分类页面，我想要点击左侧大类列表，改变右侧小类导航
//2、在点击事件里面，调用Provide.value<ChildCategory>(context)获取状态state，
//   然后调用getChildCategory(childList)，将childList传递过去，并且notifyListeners()通知数据刷新；
//3、在需要改变刷新的widget（右侧顶部小类导航）外调用Provide<CategoryGoodsListProvide>获取状态state,
//   然后用builder重新构建此widget;
//4、页面初始化请求分类信息时，需要调用一次getChildCategory(childList)，避免第一次显示的空白
}