<template>
<div>
     <div class="banner">
        <div class="bannerBr">
            <img ref="img" class="img_one" :src="scenic_info.productimg" />
              <div id="wrap">
                <ul id="list">
                    <li v-for="(item,index) in scenic_info.scenicimg" :key="index">
                        <img @click="theimg(item)" :src="item" /></li>
                </ul>
            </div>      
        </div>
        <div class="banner_info">
            <p class="biaoti">{{scenic_info.producttitle}}</p>
            <!-- 选择套餐 -->
            <ul class="chooseorder">
                <p>说明：统一单价，学生票6折</p>
                <li>
                    <span>价格 ：<span style="color:red">{{scenic_info.price}}</span></span>
                </li>
                <li>
                    <span style="float: left;">出行人数：</span>
                    <div>
                        <span @click="mebadd(0)" class="iconfont themeb">&#xe635;</span>
                        <span style="border-bottom: 0.02rem solid red">{{orderinfo.menber}} 人</span>
                        <span  @click="mebadd(1)" class="iconfont themeb">&#xe794;</span>
                    </div>
                </li>
                <li>
                    <span>联系电话：</span>
                    <input class="theinput" v-model="orderinfo.phone" type="text">
                </li>
                <li>
                    <span> &#12288;联系人：</span>
                    <input class="theinput" v-model="orderinfo.contactman" type="text">
                </li>
                <li>
                    <span>门票时间：</span>
                    <span>{{orderinfo.gotime}}</span>
                    <span class="iconfont xiabiao" @click="timeQ">&#xe64a;</span>
                </li>
                <li>
                    <span>是否需要导游(20元/位)：</span>
                    <label v-for="(item,index) in listone" :key="index">
                         <input class="chooseinput" type="radio" name="Administrator" :value="item.value" v-model="orderinfo.tourguide" />{{item.value}} 
                     </label>
                </li>
                <li>
                    <span>选择套餐：</span>
                    <label v-for="(item,index) in listtwo" :key="index">
                         <input class="chooseinput" type="radio" name="taocan" :value="item.value" v-model="orderinfo.stude_m" />{{item.value}} 
                     </label>
                </li>
                <li>
                    <span>总价：</span>
                   <span style="color:red">{{theprice}}</span>
                </li>
                <!-- 下单 -->
            <div class="xiadan" @click="addorder">
                预约下单
            </div>
            </ul>    
        </div>
    </div>
    <div>

    </div>
    <div class="jingdain">
        <div class="indexone">
            <p>景点介绍：</p>
            <ul class="thekuai">
              <li class="jingdainBr">{{scenic_info.scenic_introduce}}</li>
            </ul>
        </div>
        <div class="indexone">
            <p>推荐路线:</p>
            <ul class="thekuai" v-for="(item,index) in scenic_info.way" :key="index">
                <li class="jingdainBr">{{item}}</li>
            </ul>
        </div>
        <div class="indexone">
            <p>游玩指南：</p>
             <ul>
                <img class="themap" :src="scenic_info.Guideimg" alt="">
            </ul>
        </div>
       <div class="indexone">
            <p>留言区：<span class="iconfont" @click="liuyan()"> &#xe63b; 点我留言</span></p>
             <ul class="thekuai">
                <li class="jingdainBr">
                    <div @click="reple(item)" class="talk" v-for="(item,index) in scenic_talk" :key="index">
                        <span style="color:blue">{{item.talkname}}</span>
                         <span v-if="item.replyname!=null">
                         回复
                        <span  style="color:blue">{{item.replyname}}</span>
                        </span>
                        :
                        <span style="font-size: 0.23rem;font-weight: bold;">{{item.talkcontent}}</span>
                        <span style="margin-left: 0.6rem;color: #2c323b;">2020-1-31 16:17:00</span>
                        <span v-if="item.userid==user_info.userid" @click.stop="shanchu(item,index)" style="margin-left: 0.3rem;color: red;">删除</span>
                    </div>
                </li>
            </ul>
            <!-- 评论 -->
          <div class="talkVr" v-if="showtalk">
            <textarea v-model="addtalk.talkcontent" placeholder="说点什么吧..." id="" cols="30" rows="5" maxlength="500"></textarea>
            <div class="queding">
              <span @click="turetalk" style="background-color: #2d78f4;color:#fff;" >确定</span>
              <span @click="talkoff" style="background-color: aqua;color:#fff;">取消</span>
            </div>
          </div>
       </div>
    </div>
    <huitui></huitui>
    <div class="waibu" v-if="xainshi" @click="uimcamg">
        <div class="timeplace">
        <thetime @sendmsg="alltime"></thetime>
    </div>
    </div>
</div>
   
</template>
<script>
export default {
    data() {
        return{
            xainshi:false,
            listone:[{value:"是"},{value:"否"}],
            listtwo:[{value:"学生票"},{value:"成人票"}],
            scenic_info:{},
            scenic_talk:[],
            addtalk:{
                talkcontent:null,
                talktime:this.nowtime,
                userid:null,
                replyname:null,
                talkname:null,
                talkid:null
            },
            showtalk:false,
            orderinfo:{
                title:null,
                contactman:null,
                tourguide:null,
                menber:0,
                gotime:new Date().toLocaleDateString(),
                state:0,
                img:[],
                price:null,
                phone:null,
                stude_m:null
            }
      }
    },
    methods: {
        liuyan() {
            this.showtalk=true
            this.addtalk.replyname=null
        },
        talkoff() {
            this.showtalk=false
        },
        reple(item){
            this.showtalk=true
            this.addtalk.replyname=item.talkname
        },
       async turetalk() {
            this.addtalk.talkid=this.$route.query.theid,
      this.addtalk.talkname=this.user_info.username
      this.addtalk.userid=this.user_info.userid
      console.log(this.addtalk)
      var that=this
      await this.$axios.post(this.BasedUrl+"/api/addscenic_talk",{talkinfo:this.addtalk})
        .then(res => {
             if(res.data.success_code==200)  {     
                this.scenic_talk.push({
                  talkcontent:this.addtalk.talkcontent,
                  talktime:this.nowtime,
                  talkname:this.user_info.username,
                  userid:this.user_info.userid,
                  replyname:this.addtalk.replyname
                })  
                 this.showtalk=false     
                 this.addtalk.talkcontent=""   
                 console.log(res)
          }  
        })
        },
        mebadd(e) {
            if(e==0) {
                if(this.orderinfo.menber==0) {
                    this.orderinfo.menber=0
                }
                else{
                    this.orderinfo.menber--
                }
            }
            else  {
                 this.orderinfo.menber++
            }
        },
        timeQ() {
            this.xainshi=true
        },
        uimcamg() {
            this.xainshi=false
        },
        alltime(e) {
            this.orderinfo.gotime=e
            this.xainshi=false
        },
        theimg(item) {
            this.$refs.img.src=item
        },
        async scenictalk() {
             var id=this.$route.query.theid;
             var that=this
                await this.$axios.get(this.BasedUrl+"/api/jingdian_info",{params: {ID: id}})
                .then(res => {
                    if(res.data.success_code==200) {
                        that.scenic_info=res.data.message[0]
                    }
                    
                })
                .catch(err => {
                    console.log(err);
                });
                await this.$axios.get(this.BasedUrl+"/api/jingdian_talk",{params: {ID: id}})
                .then(res => {
                    if(res.data.success_code==200) {
                        that.scenic_talk=res.data.message
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
       async addorder() {
           
           this.orderinfo.title=this.scenic_info.producttitle
           this.orderinfo.img=this.scenic_info.scenicimg
           this.orderinfo.price=this.theprice
           console.log(this.orderinfo)
          await this.$axios.post(this.BasedUrl+"/api/neworder",{orderinfo:this.orderinfo})
        .then(res => {
            if(res.data.success_code==200) {
                   console.log(res)
               }
          })
        },
        async shanchu(item,index) {
        // 删除某条评论
      var that=this
      await this.$axios.post(this.BasedUrl+"/api/jingdiantalk",{id:item.id})
        .then(res => {
            if(res.data.success_code==200) {
                 this.scenic_talk.splice(index,1)     
            }
                         
        })
    }
    },
    computed:{
        id(){
            return this.$route.query.theid;
        },
        user_info() {
       return JSON.parse(localStorage.getItem('userinfo'))
        },
        theprice() {
            var jiege=0
            var newpir=Number(this.scenic_info.price)
            if(this.orderinfo.tourguide=="是") {
               if(this.orderinfo.stude_m=="学生票") {
                   jiege=(newpir+20)*this.orderinfo.menber*0.6
               }
               else{
                  jiege= (newpir+20)*this.orderinfo.menber
               }
           }
           else {
               if(this.orderinfo.stude_m=="学生票") {
                   jiege=newpir*this.orderinfo.menber*0.6
               }
               else {
                   jiege=newpir*this.orderinfo.menber
               }
           }
           return jiege
        }
    },
    watch: {
        id() {
            this.scenictalk()
        }
    },
   async mounted() {
       this.scenictalk()
    }
}
</script>
<style scoped>
#wrap{
    width: 4rem;
    height: 0.5rem; 
    position: relative; 
    margin-top: 0.2rem;
    overflow: hidden;
}
#list{
    position: absolute;
    left: 0; 
    top: 0; 
    margin: 0; 
    padding: 0;    
    -webkit-animation: 4s move infinite linear; 
}
#list li {
    list-style: none; 
    float: left;
}
#list img {
    width: 0.5rem;
    height: 0.5rem;
    margin-left: 0.05rem;
}
@-webkit-keyframes move{
    0% {
          left: 0;
    }
    100% {
          left: -500px;
    }
}
@keyframes move {
    0% {
       left: 0;
    }
    100% {
       left: -500px;
    }
}
#wrap:hover #list {
    -webkit-animation-play-state: paused; /*伪类设置动画暂停播放*/
}
.waibu {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.1);
  /* 背景透明度 */
}
.xiabiao {
    position: absolute;
}
.timeplace {
    position: absolute;
    top: 3rem;
    right: 2rem;

}
.banner {
    /* position :relative; */
    /* overflow: hidden; */
    margin: 0.5rem 0.5rem 0
}
.bannerBr {
    width :4rem;
    height: 4rem;
    float: left;
}
.img_one {
    width :4rem;
    height: 3rem;
    border-radius: 0.1rem;
}
.banner_info {
    font-size: 0.2rem;
    color: #2c323b;
    margin-left: 4.5rem;
}
.biaoti {
    font-size: 0.23rem;
    font-weight: bold;
}
.chooseorder {
    margin: 0.2rem;
    padding: 0.2rem;
    background-color: #e8e8e8;
    border-radius: 0.2rem;
    font-size: 0.15rem;
    overflow: hidden;
}
.chooseorder li {
    padding: 0.1rem
}
.themeb {
    color: red;
    background-color: black
}

.xiadan{
    background-color: cadetblue;
    border-radius: 0.02rem;
    line-height: 0.4rem;
    color: #fff;
    width: 1rem;
    float: right;
    text-align: center
}
.theinput {
    width: 1.5rem;
    height: 0.2rem;
}
.chooseinput {
    zoom:4;
    width: 0.2rem;
    height: 0.2rem;
}
.jingdain {
    font-size: 0.2rem;
    margin: 0.5rem;
    background-color: #e8e8e8;
    padding: 0.2rem;
}
.indexone {
    padding: 0.2rem;
    background-color: #fff;
}
.thekuai {
    background-color: #e8e8e8;
    border-radius: 0.1rem;
    list-style-type: none;
    margin-top: 0.2rem;
}
.jingdainBr {
    padding: 0.15rem;
    /* margin-top: 0.2rem; */
    /* margin-left: 0.5rem; */
    color:cadetblue;
    line-height: 0.4rem
}
.themap {
    margin-top: 0.3rem;
    width: 100%;
    height: 3rem;
}
.talk {
    font-size: 0.2rem;   
}
.talkVr {
  padding: 0.2rem;
}
.talkVr textarea{
  border: 0.01rem solid #2d78f4;
  height: 0.8rem;
  padding: 0.1rem;
  width: 6.5rem
}
.queding {
  margin: 0.05rem 0rem 0.05rem 5.5rem;
  overflow: hidden;
}
.queding span{
  /* display: block; */
  font-size: 0.15rem;
  padding: 0.08rem;
  width: 0.4rem;
  line-height: 0.3rem;
  text-align: center;
  border-radius: 0.03rem;
}
</style>
