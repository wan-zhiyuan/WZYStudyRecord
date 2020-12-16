import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    count:1
}
// 改变状态值
const mutations={
    add(state){
        state.count++
    },
    reduce(state){
        state.count--
    }
}

export default new Vuex.Store({
    state, mutations
})