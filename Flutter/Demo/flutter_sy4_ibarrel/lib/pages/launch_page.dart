//启动加载页
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter/services.dart';

class LaunchPage extends StatefulWidget {
  LaunchPage({Key key}) : super(key: key);

  _LaunchPageState createState() => _LaunchPageState();
}

class _LaunchPageState extends State<LaunchPage> {
  // 初始化
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    // 初始化设计稿尺寸
    ScreenUtil.instance = ScreenUtil(width: 800, height: 1280)..init(context);
    print('\n设备像素密度：${ScreenUtil.pixelRatio}');
    print('设备的高：${ScreenUtil.screenHeight}');
    print('设备的宽：${ScreenUtil.screenWidth}');
    // 隐藏状态栏
    SystemChrome.setEnabledSystemUIOverlays([]);
    return Scaffold(
      body: Container(
        // width: ScreenUtil().setWidth(700.0),
        decoration: BoxDecoration(
            image: DecorationImage(
                image: AssetImage("assets/images/default.png"),
                fit: BoxFit.cover)),
        child: Column(
          children: <Widget>[
            DeviceMsg(),
            LoadingMsg(),
          ],
        ),
      ),
    );
  }
}

//设备信息
class DeviceMsg extends StatefulWidget {
  DeviceMsg({Key key}) : super(key: key);

  _DeviceMsgState createState() => _DeviceMsgState();
}

class _DeviceMsgState extends State<DeviceMsg> {
  String deviceMsg = 'FBS4X(1.0) 170400120';

  @override
  Widget build(BuildContext context) {
    return new GestureDetector(
      onTap: (){print('点击设备信息文本');},
      onLongPress: () {print('长按设备信息文本');},
      child: Container(
        // width: ScreenUtil().setWidth(760),
        height: ScreenUtil().setHeight(200),
        padding: EdgeInsets.fromLTRB(0, 15.0, 30.0, 0),
        // color: Colors.blue,
        alignment: Alignment.topRight,
        child: Text(
          deviceMsg,
          style:
              TextStyle(fontSize: ScreenUtil().setSp(15), color: Colors.black),
        ),
      ),
    );
  }
}

//加载信息
class LoadingMsg extends StatefulWidget {
  LoadingMsg({Key key}) : super(key: key);

  _LoadingMsgState createState() => _LoadingMsgState();
}

class _LoadingMsgState extends State<LoadingMsg> {
  String loadingMsg = "网络不可用......";

  @override
  Widget build(BuildContext context) {
    return new Expanded(
        child: new Container(
      alignment: Alignment.bottomCenter,
      padding: const EdgeInsets.only(bottom: 170.0),
      child: Text(
        loadingMsg,
        style: TextStyle(
          fontSize: ScreenUtil().setSp(17),
        ),
      ),
    ));
  }
}
