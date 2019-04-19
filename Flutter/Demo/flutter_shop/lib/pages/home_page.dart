import 'package:flutter/material.dart';
import '../service/service_method.dart';
import 'package:flutter_swiper/flutter_swiper.dart';
import 'dart:convert'; // 引入后可使用json，包含简单的json编码器和解码器
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:url_launcher/url_launcher.dart';

// 根据请求的信息会改变页面显示的内容
class HomePage extends StatefulWidget {
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> with AutomaticKeepAliveClientMixin{
  
  int page=1;//翻页的页标
  List<Map> hotGoodsList=[];//火爆商品列表

  @override
  bool get wantKeepAlive => true;

  @override
  void initState() { //页面加载时执行
    super.initState();
    _getHotGoods();//获取火爆专区的商品
    print('1111111');
  }
  
  String homePageContent = '正在获取数据';

  @override
  Widget build(BuildContext context) {
    var formData = {'lon':'115.02932','lat':'35.76189'}; // 经纬度参数
    return Scaffold(
      appBar: AppBar(
        title: Text('百姓生活+'),
      ),
      body: FutureBuilder(
        future: request('homePageContent', formData:formData),
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
            String floor1Title = data['data']['floor1Pic']['PICTURE_ADDRESS'];// 楼层标题1
            String floor2Title = data['data']['floor2Pic']['PICTURE_ADDRESS'];// 楼层标题2
            String floor3Title = data['data']['floor3Pic']['PICTURE_ADDRESS'];// 楼层标题3
            List<Map> floor1 = (data['data']['floor1'] as List).cast();// 楼层1商品数据
            List<Map> floor2 = (data['data']['floor2'] as List).cast();// 楼层1商品数据
            List<Map> floor3 = (data['data']['floor3'] as List).cast();// 楼层1商品数据


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
                  FloorTitle(picture_address: floor1Title,),// 楼层1标题
                  FloorContent(floorGoodsList: floor1,),// 楼层1商品
                  FloorTitle(picture_address: floor2Title,),// 楼层2标题
                  FloorContent(floorGoodsList: floor2,),// 楼层2商品
                  FloorTitle(picture_address: floor3Title,),// 楼层3标题
                  FloorContent(floorGoodsList: floor3,),// 楼层3商品
                  _hotGoods(),
                ],
              ),
            );
          } else {
            return Center(
              child: Text('加载中.....',),
            );
          }
        },
      ),
    );
  }
  
  
  void _getHotGoods(){
    var formData = {'page':page};
    request('homePageBelowContent',formData:formData).then((val){
      var data=json.decode(val.toString());
      List<Map> newGoodList = (data['data'] as List).cast();
      setState(() {
       hotGoodsList.addAll(newGoodList);//将新获取的列表数据全部加入到存放火爆商品的列表里
       page++;// 页面+1
      });
    });
  }

  Widget hotTile = Container(
    margin: EdgeInsets.only(top: 10.0),//距离上组件10
    padding:EdgeInsets.all(5.0),
    alignment: Alignment.center,//居中对齐
    color:Colors.transparent,//设置背景色魏透明色
    child: Text('火爆专区'),
  );

  //火爆专区子项
  Widget _wrapList(){
    if(hotGoodsList.length!=0){
      print('存在火爆商品列表');
      //将list包装成widget再放入list中
       List<Widget> listWidget = hotGoodsList.map((val){
          return InkWell(
            onTap:(){print('点击了火爆商品');},
            child: 
            Container(
              width: ScreenUtil().setWidth(372),
              color:Colors.white,
              padding: EdgeInsets.all(5.0),
              margin:EdgeInsets.only(bottom:3.0),
              child: Column(
                children: <Widget>[
                  Image.network(val['image'],width: ScreenUtil().setWidth(375),),
                  Text(
                    val['name'],
                    maxLines: 1,
                    overflow:TextOverflow.ellipsis ,
                    style: TextStyle(color:Colors.pink,fontSize: ScreenUtil().setSp(26)),
                  ),
                  Row(
                    children: <Widget>[
                      Text('￥${val['mallPrice']}'),
                      Text(
                        '￥${val['price']}',
                        style: TextStyle(color:Colors.black26,decoration: TextDecoration.lineThrough),
                      )
                    ],
                  )
                ],
              ), 
            )
          );
      }).toList();
      return Wrap(//流式布局
        spacing: 2,//两列
        children: listWidget,//数据
      );
    }else{
      return Text(' ');
    }
  }

  Widget _hotGoods(){
    return Container(
      child:Column(
        children:<Widget>[
          hotTile,
          _wrapList(),
        ],
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
            left: BorderSide(width: 1.0,color: Colors.black12)//虚拟机不支持0.5线宽的设置
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

//楼层标题(多个楼层可复用)
class FloorTitle extends StatelessWidget {
  final String picture_address;

  FloorTitle({Key key,this.picture_address}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(8.0),
      child: Image.network(picture_address),
    );
  }
}

//楼层商品列表（多个楼层可复用）
class FloorContent extends StatelessWidget {
  final List floorGoodsList;

  FloorContent({Key key, this.floorGoodsList}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Column(
        children: <Widget>[
          _firstRow(),
          _otherGoods(),
        ],
      ),
    );
  }

  //前三个商品的组合的布局
  Widget _firstRow(){
    return Row(
      children: <Widget>[
        _goodsItem(floorGoodsList[0]),
        Column(children: <Widget>[
          _goodsItem(floorGoodsList[1]),
          _goodsItem(floorGoodsList[2]),
        ],)
      ],
    );
  }

  //其他商品组合的布局
  Widget _otherGoods(){
    return Row(
      children: <Widget>[
        _goodsItem(floorGoodsList[3]),
        _goodsItem(floorGoodsList[4]),
      ],
    );
  }

  //每个商品的子项
  Widget _goodsItem(Map goods){
    return Container(
      width: ScreenUtil().setWidth(375),
      child: InkWell(//为了此控件可以有事件响应，故使用InkWel控件
        onTap: (){print('点击了楼层商品');},
        child: Image.network(goods['image']),
      ),
    );
  }
}

//火爆专区
class HotGoods extends StatefulWidget {
  
  @override
  _HotGoodsState createState() => _HotGoodsState();
}

class _HotGoodsState extends State<HotGoods> {

  @override
  void initState() {
    super.initState();
    var formPage=1;
    request('homePageBelowContent',formData:formPage).then((val){//使用的url记得要与service_url.dart文件中的拼写一致
      print(val);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Text('iBarrel'),
    );
  }
}






