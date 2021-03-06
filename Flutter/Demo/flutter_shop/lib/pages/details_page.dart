import 'package:flutter/material.dart';
import 'package:provide/provide.dart';
import '../provide/details_info.dart';
import 'detail_page/details_top_area.dart';
import 'detail_page/details_explain.dart';
import 'detail_page/details_tabbar.dart';
import 'detail_page/details_web.dart';
import 'detail_page/details_bottom.dart';

class DetailsPage extends StatelessWidget {
  final String goodsId;
  DetailsPage(this.goodsId);
  @override
  Widget build(BuildContext context) {
    
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: Icon(Icons.arrow_back),
          onPressed: (){
            Navigator.pop(context);//关闭当前页面，返回上一页
          },
        ),
        title: Text('商品详情页面'),
      ),
      body: FutureBuilder( //此widget可异步加载
        future: _getBackInfo(context),
        builder: (context,snapshot){
          if(snapshot.hasData){
            return Stack(
              children: <Widget>[
                Container(
                  child: ListView(
                    children: <Widget>[
                      DetailsTopArea(),
                      DetailsExplain(),
                      DetailsTabbar(),
                      DetailsWeb(),
                    ],
                  ),
                ),
                Positioned(
                  bottom: 0,
                  left: 0,
                  child: DetailsBottom(),
                ),
              ],
            );
            
          }else{
            return Text('加载中......');
          }
        },
      ),
    );
  }

  Future _getBackInfo(BuildContext context) async{
    await Provide.value<DetailsInfoProvide>(context).getGoodsInfo(goodsId);
    return '完成加载';
  }


}