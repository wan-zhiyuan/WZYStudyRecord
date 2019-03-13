import 'package:flutter/material.dart';
import '../service/service_method.dart';
import 'package:flutter_swiper/flutter_swiper.dart';
import 'dart:convert';// 引入后可使用json
import 'package:flutter_screenutil/flutter_screenutil.dart';

// 根据请求的信息会改变页面显示的内容
class HomePage extends StatefulWidget {

  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {

  String homePageContent = '正在获取数据';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
       appBar: AppBar(title: Text('百姓生活+'),),
       body: FutureBuilder(
         future: getHomePageContent(),
         builder: (context,snapshot){
           if (snapshot.hasData) {
             print(snapshot.data.toString());
             var data = json.decode(snapshot.data.toString());// 获取data字段的数据
             List<Map> swiper = (data['data']['slides'] as List).cast();
             List<Map> navigatorList = (data['data']['category'] as List).cast();// 类别列表
             String adPicture = data['data']['advertesPicture']['PICTURE_ADDRESS'];// 广告图片
             String leaderImage = data['data']['shopInfo']['leaderImage'];
             String leaderPhone = data['data']['shopInfo']['leaderPhone'];

             return Column(
               children: <Widget>[
                 SwiperDiy(swiperDataList: swiper,),// 首页轮播组件
                 TopNavigator(navigatorList: navigatorList,),// 导航组件
                 AdBanner(adPicture: adPicture,),// 广告组件
                 LeaderPhone(leaderImage: leaderImage,leaderPhone: leaderPhone,)
               ],
             );
           } else {
              return Center(
                child: Text('加载中',),
              );
           }
         },
       ),
    );
  }
}

// 首页轮播组件编写
class SwiperDiy extends StatelessWidget {

  // 定义一个常量传递参数，重写构造方法
  final List swiperDataList;
  SwiperDiy({Key key,this.swiperDataList}):super(key:key);

  @override
  Widget build(BuildContext context) {
    
    return Container(
      height: ScreenUtil().setHeight(333),
      width: ScreenUtil().setWidth(750),
      child: Swiper(
        itemBuilder: (BuildContext context,int index){
          return Image.network("${swiperDataList[index]['image']}",fit: BoxFit.fill,);
        },
        itemCount: 3,
        pagination: new SwiperPagination(),
        autoplay: true,// 自动轮播
      ),
    );
  }
}
// 导航组件
class TopNavigator extends StatelessWidget {
  final List navigatorList;

  TopNavigator({Key key, this.navigatorList}) : super(key: key);

  Widget _gridViewItemUI(BuildContext context,item){
    return InkWell(
      onTap: (){print('点击了导航');},
      child: Column(
        children: <Widget>[
          Image.network(item['image'],width:ScreenUtil().setWidth(95)),
          Text(item['mallCategoryName']),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    if (this.navigatorList.length>10) {
      this.navigatorList.removeRange(10, this.navigatorList.length);
    }
    return Container(
      height: ScreenUtil().setHeight(320),
      padding: EdgeInsets.all(3.0),
      child: GridView.count(
        crossAxisCount: 5, // 设置一行为5个
        padding: EdgeInsets.all(5.0),
        children: navigatorList.map((item){
          return _gridViewItemUI(context,item);
        }).toList(),
      ),
    );
  }
}
// 广告图片
class AdBanner extends StatelessWidget {
  final String adPicture;

  AdBanner({Key key, this.adPicture}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Image.network(adPicture),
    );
  }
}
// 店长电话模块
class LeaderPhone extends StatelessWidget {
  final String leaderImage;//店长图片
  final String leaderPhone;//店长电话

  LeaderPhone({Key key, this.leaderImage, this.leaderPhone}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      child: InkWell(
        onTap: (){},
        child: Image.network(leaderImage),
      ),
    );
  }
}



