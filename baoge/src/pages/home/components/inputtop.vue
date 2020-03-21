<template>
    <div>
        <div class="top" id="content">
            <ul>
                <li class="">
                    <div class="li_one">
                        <img src="/static/imgs/图标.jpg" alt="">
                        <span >欢迎来到同城玩</span>
                    </div>
                </li>
                <li style="float: right;">
                    <span v-if="number==null" class="denglu" @click="go('./home/denglv')">快来登录注册喔</span>
                    <span v-else class="denglu" @mouseenter="theonMouseOver">账号：{{number.userphone}}</span>
                </li>
           </ul>
        </div>

                <!-- 个人信息 -->
        <div v-if="theshow" class="theuser"  @mouseleave="theonMouseout">
            <div class="to_left"></div>
            <ul>
                <li class="user_one">
                    <img src="/static/imgs/三娘湾.jpg" alt="">
                    <span class="thename">{{number.username}}</span>
                </li>
                <li class="user_one">
                    <p>账号：</p>
                    <p>{{number.userphone}}</p>
                </li>
                <li class="user_one">
                    <p>旅游风格：</p>
                    <p>{{number.userlike}}</p>
                </li>
                 <li class="user_one">
                    <p>身份：</p>
                    <p v-if="number.Administrator==1">商家管理员</p>
                    <p v-else>普通用户</p>
                    
                </li>
                <li class="off">
                    <span class="thespan" @click="go('/home/login')">注册账号</span>
                    <span class="thespan" @click="logout() ">退出登录</span>
                </li>
            </ul>
        </div>


        <!-- 搜索 -->
        <div class="searchCon">
          <ul class="searchCon_one">
                <li>同城玩</li>
          </ul>
            <ul class="searchCon_two">
                <li>
                    <div class="theinput"><input type="text" name="" id="text" v-model="keyword" /></div>
                    <span class="btn" @click="search">搜一搜</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            theshow:false,
            keyword:null
        }
    },
    methods:{
        theonMouseOver() {
            this.theshow=true
        },
        theonMouseout() {
            this.theshow=false
        },
        logout() {
            this.theshow=false
            localStorage.setItem('userinfo',null)
             this.go('/home/denglv')
        },
        search() {
             //把keyword的存储到vuex里面
             console.log(this.keyword)
            this.$store.commit("thekeyword", this.keyword);
        },
        
    },
    computed:{
        number() {
            return JSON.parse(localStorage.getItem('userinfo'))    
        }
    },
    mounted() {
    }

}
</script>
<style scoped>
.top {
    height: 0.6rem;
    background-color: #f4f3f2;
    font-size: 0.2rem;
    line-height: 0.6rem;
    padding: 0 1rem
}
.top li{
    float: left;
    color: #999
}
.li_one img{
    width: 0.2rem;
    height: 0.2rem;
}
.denglu:hover{
    color: red
}
.searchCon {
    margin-top: 0.5rem;
    overflow: hidden;
}
.searchCon_one {
    width: 100%;
    overflow: hidden;
}
.searchCon_one li{ 
    background-color: #ff5400;
    color: #fff;
    font-size: 0.2rem;
    line-height: 0.35rem;
    padding: 0.1rem 0.2rem;
    float: left;
    text-align: center;
    margin-left: 2rem
}
.searchCon_two {
    width: 100%;
    overflow: hidden;
}
.searchCon_two li {
    background-color: #ff5400;
    height: 0.6rem;
    width: 7.3rem;
    margin-left: 2rem
}
.input {
    padding: 0.01rem 0;
    background-color: #fff;
    float: left;
}
.theinput {
    padding: 0.05rem 0.05rem;
    width: 6.1rem;
    float: left;
}
.theinput input{
    width: 6rem;
    height: 0.5rem;
    padding: 0 0.1rem;
}
.btn {
    text-align: center;
    line-height: 0.6rem;
    font-size: 0.2rem;
    float: left;
    width: 1.07rem;
}
.to_left {
position: absolute;
top: -0.15rem;
left: 50%;
margin-left: -0.15rem;
width: 0;            
height: 0;            
border-bottom: 0.15rem solid red;            
border-left: 0.15rem solid transparent;            
border-right: 0.15rem solid transparent;     
 
}
.theuser {
    position: relative;
    position:fixed;
    width: 2.5rem;
    right: 0.5rem;
    top: 0.6rem;
    background-color: #999;
    font-size: 0.15rem

}
.theuser img {
    width: 0.35rem;
    height: 0.35rem;
    border-radius: 50%;
    float: left;
    
}
.user_one {
    padding: 0.05rem 0.1rem;
    overflow: hidden;
    border-bottom: 0.005rem solid #1ba8df;
}
.thename {
    margin-left: 1em;
    line-height: 0.36rem
}
.user_one p{
    float: left;
}
.thespan {
    font-size: 0.15rem;
    width: 0.7rem;
    height: 0.3rem;
    line-height: 0.3rem;
    text-align: center;
    background-color: red;
    margin-left: 0.1rem 
};
</style>