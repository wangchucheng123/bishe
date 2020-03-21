<template>
    <div class="wrap">
      <div class="container">
        <h1>“同城玩”欢迎您的到来</h1>
        <div class="biao">
          <input type="text" id="userName" placeholder="输入您的账号" v-model="account"/>
          <input type="password" id="pwd" placeholder="您的密码" v-model="userpwd" />
          
          </div>
          <button @click="onego">登录</button>
          <p @click="go('./login')">还没账号？请点击我注册喔！</p>
        
      </div>
      <!-- 页面样式 -->
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
  </div>
</template>
<script>
import { MessageBox } from 'element-ui';
export default {
    data() {
        return{
            account:null,
            userpwd:null,
        }
    },
    methods :{
       async onego(){
           if(this.account==null||this.userpwd==null) {
               alert("请填全登录信息")
           }
           else{
               var that=this
             await this.$axios.post(this.BasedUrl+"/api/register",{account:this.account,userpwd:this.userpwd})
                .then(res => {
                    // that.arr=res.data.message
                    if(res.data.success_code==200) {
                    let userdata=res.data.message
                    // 存到本地
                    localStorage.setItem('userinfo',JSON.stringify(userdata)) 
                    //      //存储到vuex里面,
                    // this.$store.commit('userfun',userdata)
                      this.$router.go(-1);
                    }
                    else{
                        alert(res.data.title)
                    }
                })
           }
        }
    },
    computed: {
    }
}
</script>
<style scoped>
* {box-sizing: border-box;}        
body {margin: 0;padding: 0; font: 16px/20px microsft yahei;}
.wrap {
    width: 100%;
    height: 100%;
    padding: 10% 0;
    position: fixed;
    background-image: url(./../../assets/imges/登录.jpg);
    background-size:100% 100%

    
    /*background: linear-gradient(to bottom right,#000000, #656565);*/
    /*background: -webkit-linear-gradient(to bottom right,#50a3a2,#53e3a6);*/
}
.container {
    width: 40%;
    margin: 0 auto;
    background-color: #f4f3f2;
    padding: 0.2rem;
    opacity: 0.9;
}
.container h1 {
        text-align: center;color: black;font-weight: 500;
        margin-bottom: 0.3rem;
        }
.biao input {
    width: 2.2rem;
    display: block;
    height: 0.4rem;
    border: 0;
    outline: 0;
    padding: 6px 10px;
    line-height: 24px;
    margin: 32px auto;
    -webkit-transition: all 0s ease-in 0.1ms;
    -moz-transition: all 0s ease-in 0.1ms;
    transition: all 0s ease-in 0.1ms;
    }
.container input{
/* background-color: #87CEEB; */
font-size: 0.25rem;
color: red;
} 

.biao input:focus {width: 2.5rem;}        
.container button {
    margin-left: 2.5rem;
    width: 1rem;
    border-radius: 0.05rem;
    margin-top: 0.4rem;
    background-color: black;
    color: #fff
}
.container p {
    font-size: 0.2rem;
    text-align: center;
    margin-top: 0.3rem;
    color: red
}
.wrap ul {
    position: absolute;
    top: 0;left: 0;
    width: 100%;height: 100%;
    z-index: -20;
}
.wrap ul li {
    list-style-type: none;
    display: block;
    position: absolute;
    bottom: -120px;
    width: 15px;
    height: 15px;
    z-index: -8;
    border-radius: 50%;
/* background-color:rgba(255, 255, 255, 0.15);*/
    animotion: square 25s infinite;
    -webkit-animation: square 25s infinite;
}        
.wrap ul li:nth-child(1) {
    background-color: yellow;
    left: 10px;  /*决定第一个泡泡冒出来的位置*/
    animation-duration: 10s;
    -moz-animation-duration: 10s;
    -o-animation-duration: 10s;
    -webkit-animation-duration: 10s;
    }
.wrap ul li:nth-child(2) {
    background-color: tomato;
    width: 0.3rem;
    height: 0.3rem;
    left: 15%;
    animation-duration: 15s;
    -moz-animation-duration: 15s;
    -o-animation-duration: 15s;
    -webkit-animation-duration: 11s;
    }
.wrap ul li:nth-child(3) {
    background-color: darkblue;
    left: 25%;width: 0.15rem;height: 0.15rem;animation-duration: 12s;
    -moz-animation-duration: 12s;-o-animation-duration: 12s;
    -webkit-animation-duration: 12s;
    }
.wrap ul li:nth-child(4) {
    background-color: red;
    width: 0.35rem;
    height: 0.35rem;
    left: 35%;
    -webkit-animation-delay: 3s;
    -moz-animation-delay: 3s;
    -o-animation-delay: 3s;
    animation-delay: 3s;
    animation-duration: 12s;
    -moz-animation-duration: 12s;
    -o-animation-duration: 12s;
    -webkit-animation-duration: 12s;
    }
.wrap ul li:nth-child(5) {
    background-color: olivedrab;
    width: 60px;
    height: 60px;
    left: 40%;
    animation-duration: 10s;
    -moz-animation-duration: 10s;
    -o-animation-duration: 10s;
    -webkit-animation-duration: 10s;}
    .wrap ul li:nth-child(6) {
        background-color: azure;
        width: 75px;
        height: 75px;
        left: 50%;
        -webkit-animation-delay: 7s;
        -moz-animation-delay: 7s;
        -o-animation-delay: 7s;
        animation-delay: 7s;}
        .wrap ul li:nth-child(7) {
            background-color: hotpink;
            left: 60%;
            width: 30px;
            height: 30px;
            animation-duration: 8s;
            -moz-animation-duration: 8s;
            -o-animation-duration: 8s;
            -webkit-animation-duration: 8s;}
    .wrap ul li:nth-child(8) {
        background-color: green;
        width: 90px;height: 90px;left: 70%;
        -webkit-animation-delay: 4s;
        -moz-animation-delay: 4s;
        -o-animation-delay: 4s;
        animation-delay: 4s; }
    .wrap ul li:nth-child(9) {
        background-color: red;
        width: 50px; height: 50px;left: 80%;animation-duration: 20s;
        -moz-animation-duration: 20s;
        -o-animation-duration: 20s;
        -webkit-animation-duration: 20s;}
    @keyframes square {
        0%{
            -webkit-transform: translateY(0);
            transform: translateY(0)}
            100% {bottom: 400px;
            -webkit-transform: translateY(-500);
            transform: translateY(-500)}
            }
    @-webkit-keyframes square {
            0%{
            -webkit-transform: translateY(0);transform: translateY(0)
            }
        100% {
            bottom: 700px;-webkit-transform: translateY(-500);
        transform: translateY(-500)
        }
        
        }
</style>