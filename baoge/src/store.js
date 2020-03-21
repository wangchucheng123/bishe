import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const state = {   //要设置的全局访问的state对象,设置初始属性值,类似组件的data一样
    // userdata: null,
    keyword:null

};
const getters = {   //实时监听state值的变化(最新状态)，类似组件的计算属性一样
    // getChangedNum(){  //承载变化的changebleNum的值
    //    return state.changableNum
    // }

};
// 更改vuex中的store中的状态的唯一方法是提交mutations，vuex中的mutations非常类似事件，
// 每个mutation都有一个类似字符串的的事件和一个回调函数，这个回调函数就是我们需要更改的地方
const mutations = {
    thekeyword(state,k) {
        state.keyword=k
    }

};
// Action 类似于 mutation，不同在于：
// Action 提交的是 mutation，而不是直接变更状态。
// Action 可以包含任意异步操作！！！mutations中绝对不允许出现异步
// 像如果组件存入数据的时候是commit时候，就直接经过mutations即可，但是是dispatch就得经过actions传给mutations！！
const actions = {
    // getNewNum(context,num){   //同上注释，num为要变化的形参
    //     context.commit('newNum',num)
    //  }
    // setToken({commit},token) {
    //     commit("tokenStatus",token)
    // }
};
const store = new Vuex.Store({ //向外抛出
    state,
    getters,
    mutations,
    actions
});
export default store;