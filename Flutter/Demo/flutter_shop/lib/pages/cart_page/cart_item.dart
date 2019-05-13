import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../model/cartInfo.dart';
import 'cart_count.dart';

class CartItem extends StatelessWidget {
  final CartInfoModel item;
  CartItem(this.item);
  
  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.fromLTRB(5.0, 2.0, 5.0, 2.0),
      padding: EdgeInsets.fromLTRB(5.0, 10.0, 5.0, 10.0),
      decoration: BoxDecoration(
        color: Colors.white,
        border: Border(
          bottom: BorderSide(width: 1,color: Colors.black12)
        )
      ),
      child: Row(
        children: <Widget>[
          _cartCheckBt(context,item),
          _cartImage(),
          _cartGoodsName(),
          _cartPrice(),
        ],
      ),
    );
  }

  //多选按钮
  Widget _cartCheckBt(context,item){
    return Container(
      child: Checkbox(
        value: item.isCheck,
        activeColor: Colors.pink,//激活颜色
        onChanged: (bool val){
          if (val) {
            
          } else {
            
          }
        },
      ),
    );
  }

  //商品图片
  Widget _cartImage(){
    return Container(
      width: ScreenUtil().setWidth(150),
      height: ScreenUtil().setHeight(150),
      padding: EdgeInsets.all(3.0),
      decoration: BoxDecoration(
        border: Border.all(width: 1,color: Colors.black12)
      ),
      child: Image.network(item.images),
    );
  }

  //商品名称
  Widget _cartGoodsName(){
    return Container(
      width: ScreenUtil().setWidth(300),
      padding: EdgeInsets.all(10),
      alignment: Alignment.topLeft,//顶端左对齐
      child: Column(
        children: <Widget>[
          Text(item.goodsName),
          CartCount(),
        ],
      ),
    );
  }

  //商品价格
  Widget _cartPrice(){
    return Container(
      width: ScreenUtil().setWidth(150),
      alignment: Alignment.centerRight,
      child: Column(
        children: <Widget>[
          Text('￥${item.price}'),
          Container(
            child: InkWell(
              onTap: (){},
              child: Icon(
                Icons.delete_forever,
                color:Colors.black26,
                size: 30,
              ),
            ),
          ),
        ],
      ),
    );
  }

}