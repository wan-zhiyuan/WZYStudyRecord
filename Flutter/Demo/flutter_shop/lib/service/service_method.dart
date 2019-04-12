import 'package:dio/dio.dart';
import 'dart:async';
import 'dart:io';
import '../config/service_url.dart';

//所有与后台通讯的接口都写在此dart文件中

//通用的请求方法
Future request(url,{formData}) async{ //{}中的参数表示可选参数
  try {
    print('开始获取数据..........');
    Response response;
    Dio dio = new Dio();
    dio.options.contentType = ContentType.parse("application/x-www-form-urlencoded");
    if(formData==null){
      response = await dio.post(servicePath[url]);
    }else{
      response = await dio.post(servicePath[url],data:formData);
    }
    if (response.statusCode == 200) {
      return response.data;
    } else {
      throw Exception('后端接口出现异常,请检查代码和服务器情况........');
    }
  } catch (e) {
    return print('ERROR:==========>${e}');
  }
}


//获取HomePage首页主题内容
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

//获得火爆专区的商品方法
Future getHomePageBeloConten() async{
  try {
    print('开始获取火爆专区数据..........');
    Response response;
    Dio dio = new Dio();
    dio.options.contentType = ContentType.parse("application/x-www-form-urlencoded");
    int page=1;//放一个页数
    response =await dio.post(servicePath['homePageBelowContent'],data:page);
    if (response.statusCode == 200) {
      return response.data;
    } else {
      throw Exception('后端接口出现异常。');
    }
  } catch (e) {
    return print('ERROR:==========>${e}');
  }
}