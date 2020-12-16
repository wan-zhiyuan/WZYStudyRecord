<template>
  <div id="app">
    <div>
      <button @click='goFront'>前进</button>
      <button @click='goBack'>后退</button>
      <button @click='goHome'>返回首页</button>
    </div>
    <router-link to="/">Home</router-link> |
    <router-link to="/params/198/wanzy">params</router-link> |
    <router-link to="/goHome">goHome</router-link> |
    <router-link to="/goParams/66/jsPang">goParams</router-link> |
    <router-link to="/hi1">Hi1</router-link> |
    <router-link to="/wanzy">wanzy</router-link> |
    <router-link to="/home">home</router-link>
    <router-link to="/111222333">我是瞎写的</router-link>
    <!-- 路由的过度动画 -->
    <!-- 简单的过度动画需要设置：fade相关的CSS样式 设置mode属性 -->
    <transition name="fade" mode='out-in'>
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: "App",
  methods:{
    goFront(){
      this.$router.go(1)
    },
    goBack(){
      this.$router.go(-1)
    },
    goHome(){
      this.$router.push('/')
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.fade-enter {
  opacity: 0px;
}
.fade-enter-active {
  transition: opacity .5s;
}
.fade-leave {
  opacity: 1;
}
.fade-leave-active {
  opacity: 0;
  transition: opacity .5s;
}

</style>
