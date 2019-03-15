// 引导页
import 'package:flutter/material.dart';// 纸墨风格
import 'package:flutter/cupertino.dart';// IOS设计风格
import 'home_page.dart';
import 'category_page.dart';
import 'cart_page.dart';
import 'member_page.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class IndexPage extends StatefulWidget {

  _IndexPageState createState() => _IndexPageState();
}

class _IndexPageState extends State<IndexPage> {
  // 创建一个list放置底部导航栏图标和文字
  final List<BottomNavigationBarItem> bottomTabs =[
    BottomNavigationBarItem(
      icon:Icon(CupertinoIcons.home),
      title: Text('首页')
    ),
    BottomNavigationBarItem(
      icon:Icon(CupertinoIcons.search),
      title: Text('分类')
    ),
    BottomNavigationBarItem(
      icon:Icon(CupertinoIcons.shopping_cart),
      title: Text('购物车')
    ),
    BottomNavigationBarItem(
      icon:Icon(CupertinoIcons.profile_circled),
      title: Text('会员中心')
    ),
  ];
  // 创建数组，存放所有页面，也可以在initState()中添加
  final List<Widget> tabBodies = [
    HomePage(),
    CategoryPage(),
    CartPage(),
    MemberPage(),
  ];
  // 建立索引
  int currentIndex = 0 ;
  // 对应的页面
  var currentPage;

  // 初始化
  void initState() { 
    currentPage = tabBodies[currentIndex];// 设置默认的页面,初始显示的页面
    print('initState()');
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    ScreenUtil.instance =ScreenUtil(width:750,height: 1334)..init(context);
    // print('设备像素密度：${ScreenUtil.pixelRatio}');
    // print('设备的高：${ScreenUtil.screenHeight}');
    // print('设备的宽：${ScreenUtil.screenWidth}');
    return Scaffold(
       backgroundColor: Color.fromRGBO(244, 245, 245, 1.0),
       bottomNavigationBar: BottomNavigationBar(
         type: BottomNavigationBarType.fixed,// 默认的type为shifting
         currentIndex: currentIndex,
         items: bottomTabs,
         onTap: (int index){ // 回调，传递点击的索引位置
          // 点击回调后执行的方法
          setState(() {
            print('setState()');
           currentIndex =index;
           currentPage= tabBodies[currentIndex];
          });
         },
       ),
       body: IndexedStack(
         index: currentIndex,
         children: tabBodies,
       ),
    );
  }
}