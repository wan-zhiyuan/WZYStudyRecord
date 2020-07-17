import 'package:flutter/material.dart';

//测试用状态管理provide
class Counter with ChangeNotifier{
  int value = 0;
  
  increment(){
    value++;
    notifyListeners();
  }
}