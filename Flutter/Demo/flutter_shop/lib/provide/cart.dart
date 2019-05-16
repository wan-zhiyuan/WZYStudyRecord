import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert'; //json转换
import '../model/cartInfo.dart';

class CartProvide with ChangeNotifier{
  String cartString = "[]";
  List<CartInfoModel> cartList=[];
  double allPrice = 0; // 总价格
  int allGoodsCount = 0; // 商品总数量
  bool isAllCheck = true; // 是否全选


  save(goodsId,goodsName,count,price,images) async {
    //初始化SharedPreferences
    SharedPreferences prefs =  await SharedPreferences.getInstance();
    cartString = prefs.getString('cartInfo');//获取持久化存储的值，cartInfo购物车信息
    //判断cartString是否为空，为空说明是第一次添加，或者key被清除了
    //如果有值进行decode操作
    var temp = cartString==null?[]:json.decode(cartString.toString());
    //decode操作返回的值为dynamic类型，转变为List类型
    List<Map> tempList = (temp as List ).cast();
    //声明变量，用于判断购物车中是否已经存在此商品ID
    bool isHave = false;//默认为false，没有
    int ival=0;//用于循环的索引，每次都是从第一项开始
    //进行循环，找出是否已经存在该商品
    tempList.forEach((item){ //item指的是tempList的具体的项
      //判断list中是否有此商品
      if (item['goodsId']==goodsId) {
        //如果存在，数量count进行+1操作，isHave置为true
        print('ival=${ival}');
        tempList[ival]['count']=item['count']+1;
        cartList[ival].count++;
        isHave = true;
      }
      ival++;
    });
    //如果没有此商品，添加此商品
    if (!isHave) {
      Map<String,dynamic> newGoods = {'goodsId':goodsId,
        'goodsName':goodsName,
        'count':count,
        'price':price,
        'images':images,
        'isCheck':true,
        };
      tempList.add(newGoods);
      cartList.add(CartInfoModel.fromJson(newGoods));//将Map转为对象，存入对象集合
    }

    //list转json，json再字符串化
    cartString = json.encode(tempList).toString();
    //字符串再持久化
    print('字符串>>>>>>>>>>${cartString}');
    print('数据模型>>>>>>>>>>>>${cartList}');
    prefs.setString('cartInfo', cartString);

    notifyListeners();
  }

  remove() async {
    SharedPreferences prefs =  await SharedPreferences.getInstance();
    prefs.remove('cartInfo');
    cartList=[];
    print('清空完成-----------------------------');
    notifyListeners();
  }

  //得到购物车中的商品
  getCartInfo() async {
    SharedPreferences prefs =  await SharedPreferences.getInstance();
    cartString = prefs.getString('cartInfo');
    //避免cartList还有值，造成数据异常，清空
    cartList=[];
    if (cartString==null) {
      cartList=[];
    } else {
      //将从sp中取出的数据转为List
      List<Map> tempList = (json.decode(cartString.toString()) as List).cast();
      //每次计算前，将统计的合计价格、合计数量置为0
      allPrice = 0;
      allGoodsCount = 0;
      //每次获得商品列表前，全选按钮默认为true
      isAllCheck=true;
      tempList.forEach((item){
        if (item['isCheck']) {
            allPrice+=(item['count']*item['price']);
            allGoodsCount+=item['count'];
        }else{
            //只要列表中有一个商品未勾选，全选按钮就不勾选
            isAllCheck=false;
        }
        //将List中的每一项item都转变为CartInfoModel对象存入集合
        cartList.add(new CartInfoModel.fromJson(item));
      });
    }
    notifyListeners();
  }

  //删除单个购物车商品
  deleteOneGoods(String goodsId) async{
    SharedPreferences prefs =  await SharedPreferences.getInstance();
    cartString = prefs.getString('cartInfo');
    List<Map> tempList = (json.decode(cartString.toString()) as List).cast();
    int tempIndex=0;//循环时所用的索引
    int delIndex=0;//需要删除的商品所在位置索引
    tempList.forEach((item){
      if (item['goodsId']==goodsId) {
        delIndex = tempIndex;
      }
      tempIndex++;
    });

    tempList.removeAt(delIndex);
    cartString = json.encode(tempList).toString();
    prefs.setString('cartInfo', cartString);
    await getCartInfo();//刷新列表信息，更新cartList ，并且刷新使用此指的Widget，即购物车列表
  }

  //点击单选按钮操作
  changeCheckState(CartInfoModel cartItem) async{
    SharedPreferences prefs =  await SharedPreferences.getInstance();
    cartString = prefs.getString('cartInfo');
    List<Map> tempList = (json.decode(cartString.toString()) as List).cast();
    int tempIndex = 0;
    int changeIndex = 0;
    //找到修改项
    tempList.forEach((item){
      if (item['goodsId']==cartItem.goodsId) {
        changeIndex=tempIndex;
      }
      tempIndex++;
    });
    tempList[changeIndex]=cartItem.toJson();
    cartString=json.encode(tempList).toString();
    prefs.setString('cartInfo', cartString);
    await getCartInfo();
  }

  //点击全选按钮操作
  changeAllCheckBtn(bool isCheck) async{
    SharedPreferences prefs =  await SharedPreferences.getInstance();
    cartString = prefs.getString('cartInfo');
    List<Map> tempList = (json.decode(cartString.toString()) as List).cast();
    List<Map> newList = new List();
    for (var item in tempList) {
      var newItem = item;
      newItem['isCheck']=isCheck;
      newList.add(newItem);
    }
    cartString = json.encode(newList).toString();
    prefs.setString('cartInfo', cartString);
    await getCartInfo();
  }

  //商品数量加减
  addOrReduceAction(CartInfoModel cartItem,String todo) async{
    SharedPreferences prefs =  await SharedPreferences.getInstance();
    cartString = prefs.getString('cartInfo');
    List<Map> tempList = (json.decode(cartString.toString()) as List).cast();
    //1、找索引值
    int tempIndex = 0;
    int changeIndex = 0;
    tempList.forEach((item){
      if (item['goodsId']==cartItem.goodsId) {
        changeIndex=tempIndex;
      }
      tempIndex++;
    });
    //2、修改需要改变的内容
    if (todo=='add') {
      cartItem.count++;
    } else if(cartItem.count>1){
      cartItem.count--;
    }
    //3、重新放入list，并且更新持久化内容
    tempList[changeIndex]=cartItem.toJson();//list中是Map对象
    cartString = json.encode(tempList);//重新转为json字符串
    prefs.setString('cartInfo', cartString);
    
    //4、重新获取购物车信息，更新页面
    await getCartInfo();
  }


}

