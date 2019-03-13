import 'package:dio/dio.dart';
import 'dart:async';
import 'dart:io';
import '../config/service_url.dart';

// 所有与后台通讯的接口都写在此dart文件中

// 获取HomePage首页主题内容
Future getHomePageContent() async{
  try {
    print('开始获取首页数据..........');
    Response response;
    Dio dio = new Dio();
    dio.options.contentType = ContentType.parse("application/x-www-form-urlencoded");
    var formData = {'lon':'115.02932','lat':'35.76189'}; // 经纬度参数
    response =await dio.post(servicePath['homePageContent'],data:formData);// 第一个参数url 第二个参数需要传递的数据
    if (response.statusCode == 200) {
      return response.data;
    } else {
      throw Exception('后端接口出现异常。');
    }
  } catch (e) {
    return print('ERROR:==========>${e}');
  }
}