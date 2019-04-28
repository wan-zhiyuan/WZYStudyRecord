import 'package:flutter/material.dart';
import '../service/service_method.dart';
import 'dart:convert';//引入后可使用json
import '../model/category.dart';
import '../model/categoryGoodsList.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:provide/provide.dart';
import '../provide/child_category.dart';
import '../provide/category_goods_list.dart';



class CategoryPage extends StatefulWidget {
  @override
  _CategoryPageState createState() => _CategoryPageState();
}

class _CategoryPageState extends State<CategoryPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('商品分类'),),
      body: Container(
        child: Row(
          children: <Widget>[
            LeftCategoryNav(),
            Column(
              children: <Widget>[
                RightCategoryNav(),
                CategoryGoodsList()
              ],
            )
            
          ],
        ),
      ),
    );
  }


}

//左侧大类导航
class LeftCategoryNav extends StatefulWidget {


  _LeftCategoryNavState createState() => _LeftCategoryNavState();
}

class _LeftCategoryNavState extends State<LeftCategoryNav> {

  List<Data> list = [];//创建的时候不知道具体的泛型，Data泛型为后加的
  var listIndex = 0;//大类所在位置的索引

  @override
  void initState() {
    super.initState();
    //左侧导航栏初始化时请求数据
    _getCategory();
    _getGoodsList();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      width: ScreenUtil().setWidth(180),//左侧导航栏的宽度
      decoration: BoxDecoration(
        border: Border(
          right: BorderSide(width: 1,color: Colors.black12)
        )
      ),
      child: ListView.builder(
        itemCount: list.length,
        itemBuilder: (context,index){
          return _leftInkWell(index);
        },
      ),
    );
  }

  Widget _leftInkWell(int index){
    bool isClick = false;
    isClick=(index==listIndex)?true:false;
    return InkWell(
      onTap: (){
        setState(() {
          listIndex = index;
        });
        var childList = list[index].bxMallSubDto;
        var categoryId = list[index].mallCategoryId;
        Provide.value<ChildCategory>(context).getChildCategory(childList);//每次点击左侧大类列表都需要更新右侧小类列表信息
        _getGoodsList(categoryId: categoryId);
      },
      child: Container(
        height: ScreenUtil().setHeight(100),
        padding: EdgeInsets.only(left: 10,),//内边距，文字距离边框的距离
        alignment: Alignment.centerLeft,
        decoration: BoxDecoration(
          color: isClick?Color.fromRGBO(236, 236, 236, 1.0): Colors.white,
          border: Border(
            bottom: BorderSide(width: 1,color:Colors.black12)
          )
        ),
        child: Text(list[index].mallCategoryName,style: TextStyle(fontSize: ScreenUtil().setSp(28)),),//style等下写
      ),
      );
  }

  //内部方法，得到后台大类数据
  void _getCategory() async{
    await request('getCategory').then((val){
      var data = json.decode(val.toString());
      CategoryModel category = CategoryModel.fromJson(data);
      setState(() {
       list = category.data; 
      });
      Provide.value<ChildCategory>(context).getChildCategory(list[0].bxMallSubDto);//初始化获得数据时，默认起始展示的数据(避免第一次展示分类页面时，右侧的空白)

    });
  }


  void _getGoodsList({String categoryId}) async{
    var data = {
      'categoryId':categoryId==null?4:categoryId,
      'categorySubId ':'',
      'page':1,
    };
    await request('getMallGoods',formData: data).then((val){
      var data = json.decode(val.toString());
      // print(data);
      CategoryGoodsListModel goodsList = CategoryGoodsListModel.fromJson(data); 
      Provide.value<CategoryGoodsListProvide>(context).getGoodList(goodsList.data);
    });
  }

}

//右侧导航
class RightCategoryNav extends StatefulWidget {
  @override
  _RightCategoryNavState createState() => _RightCategoryNavState();
}

class _RightCategoryNavState extends State<RightCategoryNav> {

  //假数据
  //List list = ['名酒','宝丰','红星','北京二锅头','舍得','五粮液','茅台','名酒','宝丰','红星','北京二锅头'];

  @override
  Widget build(BuildContext context) {
    return Provide<ChildCategory>( //当ChildCategory内的数据发生变化的时候，此Widget内的界面刷新
      builder: (context,child,childCategory){
        return Container(
            height: ScreenUtil().setHeight(80),
            width: ScreenUtil().setWidth(570),
            decoration: BoxDecoration(
              color: Colors.white,
              border: Border(
                bottom: BorderSide(width: 1,color: Colors.black12)
              )
            ),
            child: ListView.builder(
              scrollDirection: Axis.horizontal,//修改方向为横向
              itemCount: childCategory.childCategoryList.length,
              itemBuilder: (context,index){
                return _rightInkWell(childCategory.childCategoryList[index]);
              },
            ),
          );
      },
    );
    
    
  }

  Widget _rightInkWell(BxMallSubDto item){
    return InkWell(
      onTap: (){},
      child: Container(
        padding: EdgeInsets.fromLTRB(5.0, 10.0, 5.0, 10.0),
        child: Text(
          item.mallSubName,
          style: TextStyle(fontSize: ScreenUtil().setSp(28)),
        ),
      ),
    );
  }
}

//商品列表,实现可以上拉加载效果
class CategoryGoodsList extends StatefulWidget {
  @override
  _CategoryGoodsListState createState() => _CategoryGoodsListState();
}

class _CategoryGoodsListState extends State<CategoryGoodsList> {

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Provide<CategoryGoodsListProvide>(
      builder: (context,child,data){
        return Container(
          width: ScreenUtil().setWidth(570),
          height: ScreenUtil().setHeight(970),
          child: ListView.builder(
            itemCount: data.goodsList.length,
            itemBuilder: (context,index){
              return _listWidget(data.goodsList,index);
            },
          ),
        );
      },
    );
    
      
  }



  Widget _goodsImage(List newList,int index){
    return Container(
      width: ScreenUtil().setWidth(200),//避免图片过大，设置大小限制
      child: Image.network(newList[index].image),
    );
  }

  Widget _goodsName(List newList,int index){
    return Container(
      padding: EdgeInsets.all(5.0),
      width: ScreenUtil().setWidth(370),
      child: Text(
        newList[index].goodsName,
        maxLines: 2,
        overflow: TextOverflow.ellipsis,//...
        style: TextStyle(fontSize: ScreenUtil().setSp(28)),
      ),
    );
  }

  Widget _goodsPrice(List newList,int index){
    return Container(
      margin: EdgeInsets.only(top: 20),
      child: Row(
        children: <Widget>[
          Text(
            '价格：￥${newList[index].presentPrice}',
            style: TextStyle(color: Colors.pink,fontSize: ScreenUtil().setSp(30)),
          ),
          Text(
            '￥${newList[index].oriPrice}',
            style: TextStyle(color: Colors.black26,decoration: TextDecoration.lineThrough),
          ),

        ],
      ),
    );
  }

  Widget _listWidget(List newList,int index){
    return InkWell(
      onTap: (){},
      child: Container(
        padding: EdgeInsets.only(top: 5.0,bottom: 5.0),
        decoration: BoxDecoration(
          color: Colors.white, //白底
          border: Border(
            bottom: BorderSide(width: 1.0,color: Colors.black12)//底边
          )
        ),
        child: Row(
          children: <Widget>[
            _goodsImage(newList,index),
            Column(
              children: <Widget>[
                _goodsName(newList,index),
                _goodsPrice(newList,index),
              ],
            )
          ],
        ),
      ),
      );

  }

  



}







