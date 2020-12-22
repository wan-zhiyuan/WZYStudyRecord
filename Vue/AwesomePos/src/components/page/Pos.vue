<template>
  <div class="pos">
    <div>
      <el-row>
        <el-col :span="7" class="pos-order" id="order-list">
          <el-tabs>
            <el-tab-pane label="点餐">
              <el-table
                :data="tableData"
                border
                show-summary
                style="width: 100%"
              >
                <el-table-column
                  prop="goodsName"
                  label="商品名称"
                ></el-table-column>
                <el-table-column
                  prop="count"
                  label="量"
                  width="50"
                ></el-table-column>
                <el-table-column
                  prop="price"
                  label="金额"
                  width="70"
                ></el-table-column>
                <el-table-column label="操作" width="100" fixed="right">
                  <template>
                    <el-button type="text" size="small">删除</el-button>
                    <el-button type="text" size="small">增加</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="div-btn">
                <el-button type="warning">挂单</el-button>
                <el-button type="danger">删除</el-button>
                <el-button type="success">结账</el-button>
              </div>
            </el-tab-pane>
            <el-tab-pane label="挂单">挂单</el-tab-pane>
            <el-tab-pane label="外卖">外卖</el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :span="17">
          <div class="often-goods">
            <div class="title">常用商品</div>
            <div class="often-goods-list">
              <ul>
                <li v-for="(goods, index) in oftenGoods" :key="index">
                  <span>{{ goods.goodsName }}</span>
                  <span class="o-price">¥{{ goods.price }}元</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-type">
            <el-tabs>
              <el-tab-pane label=" 汉堡 ">
                <div>
                  <ul class="cookList">
                    <li v-for="goods in type0Goods" :key="goods">
                      <span class="foodImg"
                        ><img
                          :src="goods.goodsImg"
                          width="100%"
                      /></span>
                      <span class="foodName">{{goods.goodsName}}</span>
                      <span class="foodPrice">￥{{goods.price}}元</span>
                    </li>
                  </ul>
                </div>
              </el-tab-pane>
              <el-tab-pane label=" 小食 "> 小食 </el-tab-pane>
              <el-tab-pane label=" 饮料 "> 饮料 </el-tab-pane>
              <el-tab-pane label=" 套餐 "> 套餐 </el-tab-pane>
            </el-tabs>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "pos",
  data() {
    return {
      tableData: [
        {
          goodsName: "可口可乐",
          price: 8,
          count: 1,
        },
        {
          goodsName: "香辣鸡腿堡",
          price: 15,
          count: 1,
        },
        {
          goodsName: "爱心薯条",
          price: 8,
          count: 1,
        },
        {
          goodsName: "甜筒",
          price: 8,
          count: 1,
        },
      ],
      oftenGoods: [
        {
          goodsId: 1,
          goodsName: "香辣鸡腿堡",
          price: 18,
        },
        {
          goodsId: 2,
          goodsName: "田园鸡腿堡",
          price: 15,
        },
        {
          goodsId: 3,
          goodsName: "和风汉堡",
          price: 15,
        },
        {
          goodsId: 4,
          goodsName: "快乐全家桶",
          price: 80,
        },
        {
          goodsId: 5,
          goodsName: "脆皮炸鸡腿",
          price: 10,
        },
        {
          goodsId: 6,
          goodsName: "魔法鸡块",
          price: 20,
        },
        {
          goodsId: 7,
          goodsName: "可乐大杯",
          price: 10,
        },
        {
          goodsId: 8,
          goodsName: "雪顶咖啡",
          price: 18,
        },
        {
          goodsId: 9,
          goodsName: "大块鸡米花",
          price: 15,
        },
        {
          goodsId: 20,
          goodsName: "香脆鸡柳",
          price: 17,
        },
      ],
      type0Goods: [
        {
          goodsId: 1,
          goodsImg: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp1.meituan.net%2Fmogu%2F5bdad7d96d61fb34070d7846b63ae15f47365.jpg&refer=http%3A%2F%2Fp1.meituan.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611235107&t=a42a813e0f66860cfacbf94b01045a82",
          goodsName: "香辣鸡腿堡",
          price: 18,
        },
        {
          goodsId: 2,
          goodsImg: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp1.meituan.net%2Fmogu%2F5bdad7d96d61fb34070d7846b63ae15f47365.jpg&refer=http%3A%2F%2Fp1.meituan.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611235107&t=a42a813e0f66860cfacbf94b01045a82",
          goodsName: "田园鸡腿堡",
          price: 15,
        },
        {
          goodsId: 3,
          goodsImg: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp1.meituan.net%2Fmogu%2F5bdad7d96d61fb34070d7846b63ae15f47365.jpg&refer=http%3A%2F%2Fp1.meituan.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611235107&t=a42a813e0f66860cfacbf94b01045a82",
          goodsName: "和风汉堡",
          price: 15,
        },
        {
          goodsId: 4,
          goodsImg: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp1.meituan.net%2Fmogu%2F5bdad7d96d61fb34070d7846b63ae15f47365.jpg&refer=http%3A%2F%2Fp1.meituan.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611235107&t=a42a813e0f66860cfacbf94b01045a82",
          goodsName: "快乐全家桶",
          price: 80,
        },
        {
          goodsId: 5,
          goodsImg: "http://7xjyw1.com1.z0.glb.clouddn.com/pos003.jpg",
          goodsName: "脆皮炸鸡腿",
          price: 10,
        },
        {
          goodsId: 6,
          goodsImg: "http://7xjyw1.com1.z0.glb.clouddn.com/pos004.jpg",
          goodsName: "魔法鸡块",
          price: 20,
        },
        {
          goodsId: 7,
          goodsImg: "http://7xjyw1.com1.z0.glb.clouddn.com/pos001.jpg",
          goodsName: "可乐大杯",
          price: 10,
        },
        {
          goodsId: 8,
          goodsImg: "http://7xjyw1.com1.z0.glb.clouddn.com/pos003.jpg",
          goodsName: "雪顶咖啡",
          price: 18,
        },
        {
          goodsId: 9,
          goodsImg: "http://7xjyw1.com1.z0.glb.clouddn.com/pos002.jpg",
          goodsName: "大块鸡米花",
          price: 15,
        },
        {
          goodsId: 20,
          goodsImg: "http://7xjyw1.com1.z0.glb.clouddn.com/pos002.jpg",
          goodsName: "香脆鸡柳",
          price: 17,
        },
      ],
    };
  },
  mounted: function () {
    // 设置order-list的高度100%
    var orderHeight = document.body.clientHeight;
    console.log("orderHeight:" + orderHeight);
    document.getElementById("order-list").style.height = orderHeight + "px";
  },
};
</script>

<style scoped>
.pos-order {
  background-color: #f9fafc;
  border-right: 1px solid #c0ccda;
}
.div-btn {
  margin-top: 10px;
  /* display: flex;
  flex-direction: row;
  justify-content: center; */
}
.title {
  height: 20px;
  border-bottom: 1px solid #d3dce6;
  background-color: #f9fafc;
  padding: 10px;
  text-align: left;
}
.often-goods-list ul li {
  /* 去除列表的点 */
  list-style: none;
  float: left;
  border: 1px solid #e5fafc;
  padding: 10px;
  margin: 10px;
  background-color: #fff;
}
.o-price {
  color: #58b7ff;
}
.goods-type {
  clear: both;
}
.test-div {
  width: 200px;
  height: 200px;
  background-color: aquamarine;
}
.cookList li {
  list-style: none;
  width: 25%;
  border: 1px solid #e5e9f2;
  height: auto;
  overflow: hidden;
  background-color: #fff;
  padding: 2px;
  float: left;
  margin: 2px;
}
.cookList li span {
  display: block;
  float: left;
}
.foodImg {
  width: 40%;
}
.foodName {
  font-size: 18px;
  padding-left: 10px;
  color: brown;
}
.foodPrice {
  font-size: 16px;
  padding-left: 10px;
  padding-top: 10px;
}
</style>