<template>
        <!--导航栏  -->
    <div class="daohang">
        <ul class="daohang_ul">
            <li @click="thechoose(0)" @mouseenter="onMouseOverone" @mouseleave="onMouseoutone" :class="{chooseindex:theindex==0}" class="daohang_top">快捷转接
                <div class="daohang_leftone" v-if="seemone">
                <div class="buy">
                    <p style="font-size: 0.2rem;">出行购票：</p>
                    <ul style="display:flex">
                        <li @click="goone(0)">12306</li>
                        <li @click="goone(1)">机票</li>
                    </ul>
                </div>
                <div class="buy">
                    <p>出行租车：</p>
                    <ul style="display:flex">
                        <li @click="goone(2)">神州租车</li>
                        <li @click="goone(3)">1嗨租车</li>
                    </ul>
                </div>
                <div class="buy">
                    <p>酒店住宿：</p>
                    <ul style="display:flex">
                        <li @click="goone(4)">好订网</li>
                        <li @click="goone(5)">agoda网</li>
                    </ul>
                </div>
            </div>

            </li>
            <li @click="thechoose(1)" :class="{chooseindex:theindex==1}" class="daohang_top">首页</li>
            <li @click="thechoose(2)" :class="{chooseindex:theindex==2}" class="daohang_top">旅动态</li>
            <li @click="thechoose(3)" :class="{chooseindex:theindex==3}" class="daohang_top">我的订单</li>
            <li @click="thechoose(4)" :class="{chooseindex:theindex==4}" class="daohang_top">用户反馈</li>
            <li @click="thechoose(5)" @mouseenter="onMouseOver" @mouseleave="onMouseout" :class="{chooseindex:theindex==5}" class="daohang_top iconfont">
                更多
                <span v-if="seem"> &#xeb6d;</span>
                <span v-else> &#xe64a;</span>
                <div class="look" v-if="seem">
                    <p @click="Aboutus(0)">进驻加盟</p>
                    <p @click="Aboutus(1)">关于我们</p>
                    <p @click="Aboutus(2)">帮助反馈</p>
                </div>
            </li>
        </ul>
    </div>
    
</template>
<script>
export default {
    data() {
        return {
            theindex:null,
            seem:false,
            seemone:false,
        }
    },
    methods:{
        thechoose(e) {
            this.theindex=e
            // 给父组件传值
        this.$emit("thesendmsg",this.theindex)
            if(this.theindex==4) {
                this.$router.push({path: '/home/information'})
            }
            else if(this.theindex==2) {
                this.$router.push({path: '/home/dynamic'})
            }
        },
        Aboutus(e) {
            console.log(e)
            if(e==0) {
                this.$router.push('/home/enter')
            }
            else if(e==1) {
                this.$router.push('/home/Aboutus')
            }
            else if(e==2) {
                this.$router.push('/home/feedback')
            }
        },
        onMouseOver() {
            this.seem=true
        },
        onMouseout() {
            this.seem=false
        },
        onMouseOverone() {
            this.seemone=true
        },
        onMouseoutone() {
            this.seemone=false
        },
        goone(e) {
            console.log(e)
            if(e==0) {
                 window.location.href = 'https://www.12306.cn/index/'
            }
            else if(e==1) {
                 window.location.href = 'https://flights.ctrip.com/'
            }
            else if(e==2) {
                 window.location.href = 'https://www.zuche.com/'
            }
            else if(e==3) {
                 window.location.href = 'https://www.1hai.cn/'
            }
            else if(e==4) {
                 window.location.href = 'https://www.hotels.cn/'
            }
            else if(e==5) {
                 window.location.href = 'https://www.agoda.com'
            }
        }
    },
}
</script>
<style  scoped>
.daohang {
    /* padding-left: 2.5rem; */
    margin-top: 0.3rem;
    height: 0.5rem;
    position: relative; 
    font-size: 0.2rem;
}

.daohang_leftone {
    width: 1.8rem;
    height: 3.5rem;
    background-color: #2c323b;
    position: absolute;
    left: 0rem;
    top: 0.5rem;
    z-index: 2;
    display: flex; 
    flex-direction:column;
}
.buy {
    flex: 1;
    color: #fff;
    border-bottom: 0.01rem solid #e8e8e8;
    overflow: hidden;
    padding: 0.1rem;
}
.buy li {
    color:red;
    font-size: 0.2rem;
    flex: 1;
    text-align: center;
    overflow: hidden;
    /* line-height: 0.8rem !important; */
}
.daohang_ul{
    display: flex;
    background-color: #2c323b;
    line-height: 0.5rem;
}
.daohang_top {
    flex: 1;
    float: left;
    color: #fff;   
    text-align: center
}
.daohang_top:hover {
    background-color: #0c8ed9;
    font-size: 0.25rem
}
.chooseindex {
    background-color: #0c8ed9;
    font-size: 0.25rem
}
.look { 
    width: 1.8rem;
    position: absolute;
    right: 0;
    top: 0.5rem;
    background-color:#2c323b;
    color: #fff;
    text-align: center;
    font-size: 0.2rem;
    z-index: 2;
}
.look p:hover {
    background-color: #e8e8e8;
}
</style>