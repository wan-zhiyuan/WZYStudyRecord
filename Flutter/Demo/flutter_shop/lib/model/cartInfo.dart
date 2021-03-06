//购物车信息类
class CartInfoModel {
  String goodsId;   //商品Id
  String goodsName; //商品名称
  int count;        //数量
  double price;     //商品价格
  String images;    //商品图片
  bool isCheck;     //是否已选择

  CartInfoModel(
      {this.goodsId, this.goodsName, this.count, this.price, this.images, this.isCheck});

  CartInfoModel.fromJson(Map<String, dynamic> json) {
    goodsId = json['goodsId'];
    goodsName = json['goodsName'];
    count = json['count'];
    price = json['price'];
    images = json['images'];
    isCheck = json['isCheck'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['goodsId'] = this.goodsId;
    data['goodsName'] = this.goodsName;
    data['count'] = this.count;
    data['price'] = this.price;
    data['images'] = this.images;
    data['isCheck'] = this.isCheck;
    return data;
  }
}