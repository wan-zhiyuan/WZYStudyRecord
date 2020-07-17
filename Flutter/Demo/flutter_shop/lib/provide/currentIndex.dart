import 'package:flutter/material.dart';

class CurrentIndexProvide with ChangeNotifier{
  int currentIndex = 0; // 索引变量：控制底部导航和页面跳转

  changeIndex(int newIndex){
    currentIndex=newIndex; // 新索引赋值给索引变量
    notifyListeners(); // 通知
  }
}