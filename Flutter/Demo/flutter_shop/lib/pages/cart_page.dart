import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class CartPage extends StatefulWidget {
  @override
  _CartPageState createState() => _CartPageState();
}

class _CartPageState extends State<CartPage> {
  
  List<String> testList = [];
  
  @override
  Widget build(BuildContext context) {
    _show();//每次进入前进行显示
    return Container(
      child: Column(
        children: <Widget>[
          Container( //使用ListView的时候需要给它设定一个高度，所以外面包一个Container
            height: 500.0,
            child: ListView.builder(
              itemCount: testList.length,
              itemBuilder: (context,index){
                return ListTile(
                  title: Text(testList[index]),
                );
              },
            ),
          ),
          RaisedButton(
            onPressed: (){_add();},
            child: Text('增加'),
          ),
          RaisedButton(
            onPressed: (){_clear();},
            child: Text('清空'),
          )
        ],
      ),
    );
  }

  //增删改查都需要使用异步方法，因为SharedPreferences的初始化需要等待
  //增加方法
  void _add() async{
    SharedPreferences prefs = await SharedPreferences.getInstance();//初始化
    String temp = "你好，ibarrel";
    testList.add(temp);
    prefs.setStringList('testInfo', testList);
    _show();
  }

  //查询方法
  void _show() async{
    SharedPreferences prefs = await SharedPreferences.getInstance();
    if (prefs.getStringList('testInfo')!=null) {
      setState(() {
       testList = prefs.getStringList('testInfo'); 
      });
    } else {

    }
  }

  //删除方法
  void _clear() async{
    SharedPreferences prefs = await SharedPreferences.getInstance();
    //prefs.clear();//删除全部
    prefs.remove('testInfo');//删除某一项
    setState(() {
     testList=[]; 
    });
  }
}