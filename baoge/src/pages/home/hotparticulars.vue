<template>
  <div class="top">
    <div class="top_one">
      <p style="float: left;">官方美文</p>
      <p class="iconfont">&#xe63e;</p>
    </div>
    <div class="top_two">
      <ul>
        <li class="top_twoNr">
          <p class="iconfont">&#xe634; 天数：{{worddetails.longtime}}天</p>
          <p class="iconfont">&#xe790; 时间：{{worddetails.gotime}}月</p>
          <p class="iconfont">&#xe638; 人均：{{worddetails.price}}元</p>
          <p class="iconfont">&#xe6c5; 和谁：{{worddetails.whogo}}</p>
        </li>
        <li class="top_twoNr">
          <p class="iconfont">&#xe611; 推荐玩点 ：{{worddetails.whatplay}}</p>
        </li>
        <li class="top_twoNr">
          <img :src="worddetails.topimg" alt />
        </li>
        <li class="top_twoNr">
          <p>写在前面：</p>
          <p>{{worddetails.articleContent}}</p>
        </li>
        <li class="top_twoNr">
          <img v-for="(item,index) in worddetails.url" :key="index" :src="item" alt />
        </li>
      </ul>
      <!-- 评论区 -->
      <div class="talk">
        <p style="font-size: 0.25rem;overflow: hidden;">评论区:
          <span @click="talkabou" class="iconfont talking">点我发表评论&#xe63b;</span>
           </p>
        <div @click="reply(item)" class="talk_one" v-for="(item,index) in alltalk" :key="index">
          <span>{{item.talkname}}</span>
          <span v-if="item.replyname!=null">
            <span style="color: #353535;">回复</span>
            {{item.replyname}}
          </span> 
          <span style="color: #353535;font-weight:bold">: {{item.talkcontent}}</span>
          <span style=" font-size: 0.15rem;color:#2c323b">{{item.talktime}}</span>
          <span @click.stop="deletetalk(item,index)" v-if="item.userid==user.userid">删除</span>
        </div>
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
  </div>
</template>
<script>
import huitui from "./components/huitui";
export default {
  data() {
    return {
      alltalk: [],
      worddetails: {},
      addtalk:{
        talkcontent:null,
        talktime:this.nowtime,
        userid:null,
        replyname:null,
        talkname:null,
        talkid:null
      },
      showtalk:false
    };
  },
  components: {
    huitui,
  },
  computed: {
    // theid() {
    //   return this.$route.query.theid;
    // },
    user() {
       return JSON.parse(localStorage.getItem('userinfo'))
        }
  },
  methods: {
    talkabou() {
      this.showtalk=true,
      // 评论没有特定回复对象
      this.addtalk.replyname=null
    },
    talkoff() {
      this.showtalk=false
    },
    reply(item) {
      this.showtalk=true
      this.addtalk.replyname=item.talkname
    },
    // 发表回复
     async turetalk() {
      //  debugger
      this.addtalk.talkid=this.$route.query.theid,
      this.addtalk.talkname=this.user.username
      this.addtalk.userid=this.user.userid
      console.log(this.addtalk)
      var that=this
      await this.$axios.post(this.BasedUrl+"/api/addtalk",{talkinfo:this.addtalk})
        .then(res => {
          if(res.data.success_code==200) {
                  this.alltalk.push({
                  talkcontent:this.addtalk.talkcontent,
                  talktime:this.nowtime,
                  talkname:this.user.username,
                  userid:this.user.userid,
                  replyname:this.addtalk.replyname
                })  
                 this.showtalk=false     
                 this.addtalk.talkcontent=""   
               }       
        })
    },
    // 删除某条评论
    async deletetalk(item,index) {
      var that=this
      await this.$axios.post(this.BasedUrl+"/api/deletetalk",{id:item.ID})
        .then(res => {
          if(res.data.success_code==200) {
                this.alltalk.splice(index,1) 
          }              
        })
    },
    async details() {
       let id = this.$route.query.theid
      //    详情
      var that = this;
      await this.$axios
        .get(this.BasedUrl + "/api/worddetails", {
          params: {
            ID: id
          }
        })
        .then(res => {
          if(res.data.success_code==200) {
          that.worddetails = res.data.message;
          }
        })

    },
    async talk() {
      // 评论
      var that = this;
      let id =this.$route.query.theid
      await this.$axios.get(this.BasedUrl + "/api/talk", {
          params: {
            ID: id
          }
        })
        .then(res => {
          if(res.data.success_code==200) {
                  that.alltalk = res.data.message;
               }
          
        })

    }
  },
  // watch: {
  //   theid() {
  //     this.details();
  //     this.talk();
  //   }
  // },
  async mounted() {
    this.details();
    this.talk();
  }
};
</script>
<style scoped>
.top {
  padding: 1rem;
  background-color: #f4f3f2;
}
.top_one {
  padding: 0.3rem;
  background-color: #fff;
  line-height: 0.3rem;
  font-size: 0.2rem;
}
.top_two {
  padding: 0.3rem;
  background-color: #fff;
  overflow: hidden;
}
.top_twoNr {
  width: 100%;
  font-size: 0.2rem;
  padding: 0.2rem;
}
.top_twoNr p {
  float: left;
  margin-right: 0.2rem;
  line-height: 0.3rem;
}
.top_twoNr img {
  height: 2rem;
  width: 4rem;
  display: block;
  padding: 0.1rem;
}
.talk {
  background-color: #f4f3f2;
  padding: 0.2rem;
  font-size: 0.2rem;
  overflow: hidden;
  margin-bottom: 3rem
}
.talking {
  font-size: 0.18rem;
  float: right;
  border:0.01rem solid #495f8c;
  padding: 0.1rem;
  border-radius: 0.1rem
}
.talk_one {
  padding: 0.2rem;
  overflow: hidden;
  color: #495f8c;
}
.talk_one span {
  overflow: hidden;
  line-height: 0.25rem;
}
.talk_oneBr {
  color: #495f8c;
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