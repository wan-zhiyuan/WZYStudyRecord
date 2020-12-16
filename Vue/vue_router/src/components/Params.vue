<template>
  <div>
    <h2>{{ msg }}</h2>
    <p>newsId:{{ $route.params.newsId }}</p>
    <p>newsTitle:{{ $route.params.newsTitle }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "Params pages",
    };
  },
  // 钩子函数：写在模板中
  beforeRouteEnter: (to, from, next) => {
    console.log("准备进入路由模板");
    // 获取远程数据， 可以放在这里

    next();
  },
  beforeRouteLeave: (to, from, next) => {
    console.log("准备离开路由模板");
    next();
  },
};
</script>

<style>
</style>