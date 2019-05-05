import 'package:flutter/material.dart';
import '../service/service_method.dart';
import 'dart:convert';//引入后可使用json
import '../model/category.dart';
import '../model/categoryGoodsList.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:provide/provide.dart';
import '../provide/child_category.dart';
import '../provide/category_goods_list.dart';
import 'package:flutter_easyrefresh/easy_refresh.dart';
import 'package:fluttertoast/fluttertoast.dart';



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
        print(categoryId);
        Provide.value<ChildCategory>(context).getChildCategory(childList,categoryId);//每次点击左侧大类列表都需要更新右侧小类列表信息
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
      Provide.value<ChildCategory>(context).getChildCategory(list[0].bxMallSubDto,list[0].mallCategoryId);//初始化获得数据时，默认起始展示的数据(避免第一次展示分类页面时，右侧的空白)

    });
  }


  void _getGoodsList({String categoryId}) async{
    var data = {
      'categoryId':categoryId==null?4:categoryId, //大类id
      'categorySubId':'',                        //子类id
      'page':1,
    };
    await request('getMallGoods',formData: data).then((val){
      var data = json.decode(val.toString());
      // print(data);
      CategoryGoodsListModel goodsList = CategoryGoodsListModel.fromJson(data); 
      Provide.value<CategoryGoodsListProvide>(context).getGoodsList(goodsList.data);
    });
  }

}

//右侧小类导航
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
                return _rightInkWell(index,childCategory.childCategoryList[index]);
              },
            ),
          );
      },
    );
    
    
  }

  //右侧小类导航的每一项
  Widget _rightInkWell(int index,BxMallSubDto item){ //index告诉此widget自己的索引是多少

    bool isClick = false;
    isClick =(index==Provide.value<ChildCategory>(context).childIndex)?true:false;//当此项的索引与用户点击记录的索引一致时返回true，显示高亮

    return InkWell(
      onTap: (){
        Provide.value<ChildCategory>(context).changeChildIndex(index,item.mallSubId);
        _getGoodsList(item.mallSubId);
      },
      child: Container(
        padding: EdgeInsets.fromLTRB(5.0, 10.0, 5.0, 10.0),
        child: Text(
          item.mallSubName,
          style: TextStyle(
            fontSize: ScreenUtil().setSp(28),
            color: isClick?Colors.pink:Colors.black //用isClick判断是否高亮
            ),
        ),
      ),
    );
  }

    void _getGoodsList(String categorySubId) async{
      var data = {
        'categoryId':Provide.value<ChildCategory>(context).categoryId, //大类id (已通过状态管理在点击大类时，保存了categoryId)
        'categorySubId':categorySubId,                                 //子类id，如果想获得子类所有的数据，传''空就行
        'page':1,
      };
      await request('getMallGoods',formData: data).then((val){
        var data = json.decode(val.toString());
        CategoryGoodsListModel goodsList = CategoryGoodsListModel.fromJson(data); 
        if(goodsList.data==null){
          Provide.value<CategoryGoodsListProvide>(context).getGoodsList([]);
        }else{
          Provide.value<CategoryGoodsListProvide>(context).getGoodsList(goodsList.data);
        }
      });
    }
}

//商品列表,实现可以上拉加载效果
class CategoryGoodsList extends StatefulWidget {
  @override
  _CategoryGoodsListState createState() => _CategoryGoodsListState();
}

class _CategoryGoodsListState extends State<CategoryGoodsList> {

  GlobalKey<RefreshFooterState> _footerkey = new GlobalKey<RefreshFooterState>();

  var scrollController = new ScrollController();

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Provide<CategoryGoodsListProvide>( //页面初始化时,此处一共会被build两次，一次是默认的，另外一次是执行了getGoodsList方法,刷新了页面
      builder: (context,child,data){
        try {
          if(Provide.value<ChildCategory>(context).page==1){
            // 商品列表位置，定位到顶部
            scrollController.jumpTo(0.0);
          }
        } catch (e) {
          print('进入页面第一次初始化:${e}');
        }
        if(data.goodsList.length>0){
          return Expanded(
            child: Container(
              width: ScreenUtil().setWidth(570),
              child: EasyRefresh(
                refreshFooter: ClassicsFooter(
                  key: _footerkey,//注意此项一定要创建
                  bgColor: Colors.white,//背景颜色
                  textColor: Colors.pink,//文字颜色
                  moreInfoColor: Colors.pink,
                  showMore: true,
                  noMoreText: Provide.value<ChildCategory>(context).noMoreText,
                  moreInfo: '加载中',//加载中显示的文字
                  loadReadyText: '上拉加载...',//加载前显示的文字
                ),
                child: ListView.builder(
                  controller: scrollController,
                  itemCount: data.goodsList.length,
                  itemBuilder: (context,index){
                    return _listWidget(data.goodsList,index);
                    },
                ),
                loadMore: ()async{
                  print('上拉加载更多........');
                  _getMoreList();
                },
              ),
              
              
            ),
          );
        }else{
          return Text('暂时没有数据');
        }
        
        
      },
    );
    
      
  }
  
  void _getMoreList() async{
    Provide.value<ChildCategory>(context).addPage();
    var data = {
      'categoryId':Provide.value<ChildCategory>(context).categoryId, //大类id (已通过状态管理在点击大类时，保存了categoryId)
      'categorySubId':Provide.value<ChildCategory>(context).subId,                                 //子类id
      'page':Provide.value<ChildCategory>(context).page,
    };
    await request('getMallGoods',formData: data).then((val){
      var data = json.decode(val.toString());
      CategoryGoodsListModel goodsList = CategoryGoodsListModel.fromJson(data); 
      if(goodsList.data==null){
        //toast提示
        Fluttertoast.showToast(
          msg: "已经到底了",
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.CENTER,//提示的位置
          backgroundColor: Colors.pink,//背景色
          textColor: Colors.white,
          fontSize: 16.0,
        );
        Provide.value<ChildCategory>(context).changeNoMore('没有更多了');
      }else{
        Provide.value<CategoryGoodsListProvide>(context).getMoreList(goodsList.data);
      }
    });
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







