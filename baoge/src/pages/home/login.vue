<template>
    <div class="login">
        <div class="login_top">
            <p style="text-align: center">用户注册</p>
            <ul style="padding: 0.2rem ">
                <li class="loginone">
                     <span class="iconfont">&#xe6c5;</span>姓名：&#12288;&#12288;<input type="text"  v-model="information.thename">
                </li>
                <li class="loginone">
                  <span class="iconfont">&#xe65e;</span>账号：&#12288;&#12288;<input name="userName" id="userName"  type="text" v-model="information.zhanghao">
                </li>
                <li class="loginone">
                     <span class="iconfont">&#xe652;</span>密码：&#12288;&#12288;<input type="password"  v-model="information.thepwd">
                </li>
                <li class="loginone">
                    <span class="iconfont">&#xe666;</span>确认密码：<input type="password"  v-model="twothepwd">
                </li>
                <li class="loginone">
                    <p>请选择一种您喜欢的旅游类型:</p>
                    <label v-for="(item,index) in list" :key="index">
                        <input style="zoom:4"  type="radio" name="test" :value="item.value" v-model="information.thelike" />
                        {{item.value}}
                    </label>
                </li>
                <li class="loginone"> 
                    <span>是否注册成为商家管理员：</span>
                     <label v-for="(item,index) in listone" :key="index">
                         <input style="zoom:4" type="radio" name="Administrator" :value="item.theindex" v-model="information.Administrator" />{{item.value}} 
                     </label>
                </li>
            </ul>
            <button @click="register">注册</button>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            list:[{value:"民族风"},{value:"历史感"},{value:"浪漫区"},{value:"美景类"},{value:"其他"}],
            listone:[{theindex:1,value:"是"},{theindex:0,value:"否"}],
            information : {
                thename:null,
                zhanghao:null,
                thepwd:null,
                thelike:null,
                Administrator:null
            },
            twothepwd:null
        }
    },
    methods :{
       async register() {
            if(this.information.thename==null||this.information.zhanghao==null||this.information.thepwd==null||this.information.thelike==null||this.information.Administrator==null) {
                alert("信息没填完整")
            }
            else {
                if(this.information.thepwd==this.twothepwd) {
                    var that=this
                     await this.$axios.post(this.BasedUrl+"/api/login",{account:this.information})
                    .then(res => {      
                            if(res.data.success_code==200)  {
                             alert("注册成功")
                             that.go('./denglv') 
                      }                   
                    })
                    .catch(err => {
                    });
                }
                else{
                    alert("二次密码不一样")
                }
            }
    }
}
}
</script>
<style scoped>
.login {
    background-image: url(./../../assets/imges/timg.jpg);
    background-size:100% 100%;
    width: 100%;
    height: 100%;
    position: fixed;
    
}
.login_top {
    height: 3.5rem;
    width:4rem;
    border: 1px solid #d8d8d8;
    border-radius: 0.01rem;
    background: #f9f9f9;
    opacity: 0.8;
    margin: 0.8rem auto;
    font-size: 0.15rem;
    font-weight: bold ;
    padding: 0.2rem;
     
}
.loginone{
    margin-top: 0.1rem
}
.loginone input {
    border: 0.01rem solid black;
    padding: 0.05rem;
}
.loginone p {
    margin-bottom:0.15rem
}
.login_top button {
    height: 0.4rem;
    width: 0.8rem;
    border-radius: 0.01rem;
    background-color: red;
    color: #fff;
    margin-left: 3rem
}
</style>