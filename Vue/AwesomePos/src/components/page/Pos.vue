<template>
  <div class="pos">
    <div>
      <el-row>
        <el-col :span="7" class="pos-order" id="order-list">
          <el-tabs>
            <el-tab-pane label="点餐">
              <!-- el-table自带的统计 show-summary -->
              <el-table :data="tableData" border style="width: 100%">
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
                  <!-- template的scope用法 自行学习 -->
                  <template scope="scope">
                    <el-button
                      type="text"
                      size="small"
                      @click="delSingleGoods(scope.row)"
                      >删除</el-button
                    >
                    <!-- scope.row当前行数据（goods） -->
                    <el-button
                      type="text"
                      size="small"
                      @click="addOrderList(scope.row)"
                      >增加</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
              <div class="totalDiv">
                <small>数量：</small>{{ totalCount }} &nbsp;&nbsp;&nbsp;&nbsp;
                <small>金额：</small>{{ totalMoney }}
              </div>
              <div class="div-btn">
                <el-button type="warning">挂单</el-button>
                <el-button type="danger" @click="delAllGoods()">删除</el-button>
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
              <ul class="oftenList">
                <li
                  v-for="(goods, index) in oftenGoods"
                  :key="index"
                  @click="addOrderList(goods)"
                >
                  <span>{{ goods.goodsName }}</span>
                  <span class="o-price">¥{{ goods.price }}元</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-type">
            <el-tabs>
              <el-tab-pane label=" 汉堡 ">
                <ul class="cookList">
                  <li
                    v-for="goods in type0Goods"
                    :key="goods.id"
                    @click="addOrderList(goods)"
                  >
                    <span class="foodImg">
                      <img :src="goods.goodsImg" width="100%" />
                    </span>
                    <span class="foodName">{{ goods.goodsName }}</span>
                    <span class="foodPrice">￥{{ goods.price }}元</span>
                  </li>
                </ul>
              </el-tab-pane>
              <el-tab-pane label=" 小食 ">
                <ul class="cookList">
                  <li
                    v-for="goods in type1Goods"
                    :key="goods.id"
                    @click="addOrderList(goods)"
                  >
                    <span class="foodImg">
                      <img :src="goods.goodsImg" width="100%" />
                    </span>
                    <span class="foodName">{{ goods.goodsName }}</span>
                    <span class="foodPrice">￥{{ goods.price }}元</span>
                  </li>
                </ul>
              </el-tab-pane>
              <el-tab-pane label=" 饮料 ">
                <ul class="cookList">
                  <li
                    v-for="goods in type2Goods"
                    :key="goods.id"
                    @click="addOrderList(goods)"
                  >
                    <span class="foodImg">
                      <img :src="goods.goodsImg" width="100%" />
                    </span>
                    <span class="foodName">{{ goods.goodsName }}</span>
                    <span class="foodPrice">￥{{ goods.price }}元</span>
                  </li>
                </ul>
              </el-tab-pane>
              <el-tab-pane label=" 套餐 "
                ><ul class="cookList">
                  <li
                    v-for="goods in type3Goods"
                    :key="goods.id"
                    @click="addOrderList(goods)"
                  >
                    <span class="foodImg">
                      <img :src="goods.goodsImg" width="100%" />
                    </span>
                    <span class="foodName">{{ goods.goodsName }}</span>
                    <span class="foodPrice">￥{{ goods.price }}元</span>
                  </li>
                </ul></el-tab-pane
              >
            </el-tabs>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "pos",
  data() {
    return {
      tableData: [],
      oftenGoods: [],
      type0Goods: [],
      type1Goods: [],
      type2Goods: [],
      type3Goods: [],
      totalMoney: 0,
      totalCount: 0,
    };
  },
  created: function () {
    axios
      .get(
        "https://www.fastmock.site/mock/0bf6a5bae7eab8507e44b56191ddff36/vuepos/oftenGoods"
      )
      .then((response) => {
        this.oftenGoods = response.data.oftenGoods;
      })
      .catch((error) => {
        console.log(error);
        alert("网络错误，无法访问");
      });
    axios
      .get(
        "https://www.fastmock.site/mock/0bf6a5bae7eab8507e44b56191ddff36/vuepos/typeGoods"
      )
      .then((response) => {
        console.log(response);
        this.type0Goods = response.data.data[0];
        this.type1Goods = response.data.data[1];
        this.type2Goods = response.data.data[2];
        this.type3Goods = response.data.data[3];
      })
      .catch((error) => {
        console.log(error);
        alert("网络错误，无法访问");
      });
  },
  mounted: function () {
    // 设置order-list的高度100%
    var orderHeight = document.body.clientHeight;
    console.log("orderHeight:" + orderHeight);
    document.getElementById("order-list").style.height = orderHeight + "px";
  },
  methods: {
    addOrderList(goods) {
      // 商品是否已经存在于订单列表中
      let isHave = false;
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].goodsId == goods.goodsId) {
          isHave = true;
        }
      }
      // 根据判断的值编写业务逻辑
      if (isHave) {
        // 改变列表中的商品数量
        let arr = this.tableData.filter((o) => o.goodsId == goods.goodsId);
        arr[0].count++;
      } else {
        let newGoods = {
          goodsId: goods.goodsId,
          goodsName: goods.goodsName,
          price: goods.price,
          count: 1,
        };
        this.tableData.push(newGoods);
      }

      this.getAllMoney()
    },
    delSingleGoods(goods) {
      this.tableData = this.tableData.filter((o) => o.goodsId != goods.goodsId);

      this.getAllMoney();
    },
    delAllGoods(){
      this.tableData = []
      this.totalCount = 0
      this.totalMoney = 0
    },
    // 汇总数量和金额
    getAllMoney() {
      this.totalMoney = 0;
      this.totalCount = 0;
      if (this.tableData) {
        // 计算汇总金额和数量
        this.tableData.forEach((element) => {
          this.totalCount += element.count;
          this.totalMoney = this.totalMoney + element.price * element.count;
        });
        console.log("###############");
        console.log("总数：" + this.totalCount);
        console.log("总金额：" + this.totalMoney);
      }
    },
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
  cursor: pointer;
}
.o-price {
  color: #58b7ff;
}
.goods-type {
  clear: both;
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
  cursor: pointer;
}
.cookList li span {
  display: block;
  float: left;
}
.foodImg {
  /* width: 40%; */
  width: 80px;
  height: 80px;
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
.totalDiv {
  background-color: #fff;
  padding: 10px;
  border-bottom: 1px solid #d3dce6;
}
</style>