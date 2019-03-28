import 'package:flutter/material.dart';
import '../service/service_method.dart';
import 'package:flutter_swiper/flutter_swiper.dart';
import 'dart:convert'; // 引入后可使用json
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:url_launcher/url_launcher.dart';

// 根据请求的信息会改变页面显示的内容
class HomePage extends StatefulWidget {
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> with AutomaticKeepAliveClientMixin{
  
  @override
  bool get wantKeepAlive => true;

  @override
  void initState() { 
    super.initState();
    print('1111111');
  }
  
  String homePageContent = '正在获取数据';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('百姓生活+'),
      ),
      body: FutureBuilder(
        future: getHomePageContent(),
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            print(snapshot.data.toString());
            var data = json.decode(snapshot.data.toString()); // 获取data字段的数据
            List<Map> swiper = (data['data']['slides'] as List).cast();
            List<Map> navigatorList = (data['data']['category'] as List).cast(); // 类别列表
            String adPicture = data['data']['advertesPicture']['PICTURE_ADDRESS']; // 广告图片
            String leaderImage = data['data']['shopInfo']['leaderImage'];
            String leaderPhone = data['data']['shopInfo']['leaderPhone'];
            List<Map> recommednList = (data['data']['recommend'] as List).cast();

            return SingleChildScrollView(
              child: Column(
                children: <Widget>[
                  SwiperDiy(swiperDataList: swiper,), // 页面顶部轮播组件
                  TopNavigator(navigatorList: navigatorList,), // 导航组件
                  AdBanner(adPicture: adPicture,), // 广告组件
                  LeaderPhone(
                    leaderImage: leaderImage,
                    leaderPhone: leaderPhone,
                  ),
                  Recommend(recommendList: recommednList,),// 商品推荐
                ],
              ),
            );
          } else {
            return Center(
              child: Text(
                '加载中',
              ),
            );
          }
        },
      ),
    );
  }
}
//首页轮播组件编写
class SwiperDiy extends StatelessWidget {
  // 定义一个常量传递参数，重写构造方法
  final List swiperDataList;
  SwiperDiy({Key key, this.swiperDataList}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      height: ScreenUtil().setHeight(333),
      width: ScreenUtil().setWidth(750),
      child: Swiper(
        itemBuilder: (BuildContext context, int index) {
          return Image.network(
            "${swiperDataList[index]['image']}",
            fit: BoxFit.fill,
          );
        },
        itemCount: 3,
        pagination: new SwiperPagination(),
        autoplay: true, // 自动轮播
      ),
    );
  }
}

//导航组件
class TopNavigator extends StatelessWidget {
  final List navigatorList;

  TopNavigator({Key key, this.navigatorList}) : super(key: key);

  Widget _gridViewItemUI(BuildContext context, item) {
    return InkWell(
      onTap: () {
        print('点击了导航');
      },
      child: Column(
        children: <Widget>[
          Image.network(item['image'], width: ScreenUtil().setWidth(95)),
          Text(item['mallCategoryName']),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    if (this.navigatorList.length > 10) {
      this.navigatorList.removeRange(10, this.navigatorList.length);
    }
    return Container(
      height: ScreenUtil().setHeight(320),
      padding: EdgeInsets.all(3.0),
      child: GridView.count(
        physics: NeverScrollableScrollPhysics(),// 禁止GridView滚动设置
        crossAxisCount: 5, // 设置一行为5个
        padding: EdgeInsets.all(4.0),
        children: navigatorList.map((item) {
          return _gridViewItemUI(context, item);
        }).toList(),
      ),
    );
  }
}

//广告图片
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

//店长电话模块
class LeaderPhone extends StatelessWidget {
  final String leaderImage; //店长图片
  final String leaderPhone; //店长电话

  LeaderPhone({Key key, this.leaderImage, this.leaderPhone}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      child: InkWell(
        onTap: _launchURL,
        child: Image.network(leaderImage),
      ),
    );
  }

  void _launchURL() async {
    String url = 'tel:' + leaderPhone;
    if (await canLaunch(url)) {
      // 判断此url是否可用合法,符合四个原则
      await launch(url);
    } else {
      throw 'url不能进行访问，异常';
    }
  }
}

//商品推荐
class Recommend extends StatelessWidget {
  final List recommendList;

  Recommend({Key key, this.recommendList}) : super(key: key);

  //商品推荐组件的标题方法
  Widget _titleWidget(){
    return Container(
      alignment: Alignment.centerLeft,//对齐方式
      padding: EdgeInsets.fromLTRB(10.0, 2.0, 0, 5.0),
      decoration: BoxDecoration(//制作底部下划线
        color: Colors.white,
        border: Border(
          bottom: BorderSide(width: 0.5,color: Colors.black12)//线宽0.5，浅灰色
        ),
      ),
      child: Text(
        '商品推荐',
        style: TextStyle(color: Colors.pink),),
    );
  }

  //商品单独项方法
  Widget _item(index){
    return InkWell(
      onTap: (){},
      child: Container(
        height: ScreenUtil().setHeight(330),
        width: ScreenUtil().setWidth(250),
        padding: EdgeInsets.all(8.0),
        decoration: BoxDecoration(
          color: Colors.white,
          border: Border(
            left: BorderSide(width: 1.0,color: Colors.black12)
          ),
        ),
        child: Column(
          children: <Widget>[
            Image.network(recommendList[index]['image']),
            Text('￥${recommendList[index]['mallPrice']}'),//本商城价格
            Text(
              '￥${recommendList[index]['price']}',
              style: TextStyle(
                decoration: TextDecoration.lineThrough,//删除线
                color: Colors.grey,
              ),
              ),
          ],
        ), 
      ),
    );
  }

  //横向列表方法
  Widget _recommedList(){
      return Container(
        height: ScreenUtil().setHeight(350),
        child: ListView.builder(
          scrollDirection: Axis.horizontal,
          itemCount: recommendList.length,
          itemBuilder: (context,index){
            return _item(index);
          },
        ),
      );
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      height: ScreenUtil().setHeight(420),
      margin: EdgeInsets.only(top: 10.0),
      child: Column(
        children: <Widget>[
          _titleWidget(),
          _recommedList(),
        ],
      ),
    );
  }
}

