import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    count:1
}
// 改变状态值
const mutations={
    add(state, n){
        state.count+=n
    },
    reduce(state){
        state.count--
    }
}

const getters = {
    // 每次count发生变化，都会执行getters中对应的方法
    count:function(state){
        return state.count += 100
    }
}

const actions = {
    addAction(context){
        setTimeout(()=>{
            context.commit('add',10)
        },3000)
        console.log('我比reduce提前执行')
    },
    reduceAction({commit}){
        commit('reduce')
    }
}


export default new Vuex.Store({
    state, mutations, getters, actions
})