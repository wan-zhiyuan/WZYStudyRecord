<template>
    <div>
        <h2>{{msg}}</h2><hr>
        <h3>{{$store.state.count}}-{{count}}</h3>
        <p>
            <!-- 修改状态：方法一 -->
            <!-- $store.commit('方法名') -->
            <!-- <button @click="$store.commit('add',10)">+</button>
            <button @click="$store.commit('reduce')">-</button> -->
            <!-- 修改状态：方法二 -->
            <button @click="add(10)">+</button>
            <button @click="reduce">-</button>
        </p>
        <p>
            <button @click="addAction">+</button>
            <button @click="reduceAction">-</button>
        </p>
    </div>
</template>

<script>
import store from '@/vuex/store'
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
export default {
    data(){
        return{
            msg:'Hello Vuex'
        }
    },
    // 方法一
    // computed:{
    //     count(){
    //         return this.$store.state.count;
    //     }
    // },
    // 方法二
    // computed:mapState({
    //     count:state=>state.count
    // }),
    // 方法三
    computed:{
        ...mapState(['count']),
        ...mapGetters(['count']),
    },
    
    methods:{
        ...mapMutations(['add','reduce']),
        ...mapActions(['addAction','reduceAction'])
    },
        
    store
}
</script>

<style>

</style>