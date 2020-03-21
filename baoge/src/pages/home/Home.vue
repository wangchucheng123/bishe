<template>
    <div>
        <!-- 头部 -->
        <inputtop></inputtop>
        <!--导航栏  -->
        <navigationBar @thesendmsg="chooseindex"></navigationBar>
        <!-- 轮播图 -->
        <Swiper></Swiper>
        <!-- 预定门票 -->
        <ticket></ticket>
        <!-- 订单区 -->
        <order></order>
        <!-- 景点美文-->
        <hotscenic></hotscenic>
        <!-- 网站尾部 -->
        <thebottom></thebottom>
        <!-- 回到顶部 -->
        <gotop></gotop>
    </div>
</template>
<script>
import inputtop from './components/inputtop'
import Swiper from './components/lunbotu'
import navigationBar from './components/navigationBar'
import hotscenic from './components/hotscenic'
import ticket from './components/ticket'
import thebottom from './components/thebottom'
import gotop from './components/gotop'
import order from './components/order'

export default {
    // inject:['reload'],                                 //注入App里的reload方法
    data() {
        return {
            theindex:null
        }
    },
    methods:{
        chooseindex(e) {
            this.theindex=e
            console.log(this.theindex)
        }
    },
    
    components: {
        Swiper,
        navigationBar,
        hotscenic,
        ticket,
        thebottom,
        gotop,
        inputtop,
        order
    },
    computed:{

    },
    mounted() {  
        // this.reload()
    }
}
</script>
<style scoped>
</style>