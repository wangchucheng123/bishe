<template>
    <div class="dynamic">
        <p class="top">同城玩，分享你的旅游乐事</p>
        <div class="dynamicone">
            <ul class="myorder_top">
                <li @click="chooseorder(0)" :class="{myorder_choose:this.theindexone==0}"><span>全部动态</span></li>
                <li @click="chooseorder(1)" :class="{myorder_choose:this.theindexone==1}"><span>我的动态</span></li>
                <li @click="chooseorder(2)" :class="{myorder_choose:this.theindexone==2}"><span>点我发布</span></li>
            </ul>
            <div class="everydy" v-for="(item,index) in alldynamic" :key="index">
                <img class="touxiang" :src="item.userpoint" alt="">
                <div class="threright">
                    <p>{{item.username}}</p>
                    <p>{{item.thetime}}</p>
                    <button @click="remove(item,index)" class="splie" v-if="userinfo.userid==item.userid">删除</button>
                    <div class="conment">
                        <p>{{item.content}}</p>
                        <div style=" margin-top: 0.2rem;overflow: hidden;">
                            <img v-for="(items,indexx) in item.img" :key="indexx" class="touxiang" :src="items" alt="">
                            
                        </div>
                        <p @click="talkshow(item,index)" class="iconfont thetalk">&#xe606;评论</p>
                    </div>
                </div>
                <div class="talk">
                    <div class="talk_one" @click="reply(talkitem,index)" v-for="(talkitem,k) in item.alltalk" :key="k">
                        <span>{{talkitem.talkname}}</span>
                        <span v-if="talkitem.replyname!=null">
                            <span style="color: #353535;">回复</span>
                            {{talkitem.replyname}}
                        </span>
                        <span style="color: #353535;font-weight:bold">: {{talkitem.talkcontent}}</span>
                        <span style=" font-size: 0.15rem;color:#2c323b">{{talkitem.talktime}}</span>
                        <span @click.stop="remove(talkitem,k,index)" style="color: red;" v-if="userinfo.userid==talkitem.userid">删除</span>
                     </div>
                </div>
                <!-- 评论 -->
                <div class="talkVr" v-if="theindex==index">
                    <textarea v-model="addtalk.talkcontent" placeholder="说点什么吧..." id="" cols="30" rows="5" maxlength="500"></textarea>
                    <div class="queding">
                    <span @click="turetalk(item,index)" style="background-color: #2d78f4;color:#fff;" >确定</span>
                    <span @click="talkoff" style="background-color: aqua;color:#fff;">取消</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            theindexone:0,
            LogComments: {
                CommentContent:null
            },
            alldynamic:[],
            thedynamic:[],
            theindex:-1,
            addtalk:{
                talkcontent:null,
                talktime:this.nowtime,
                userid:null,
                replyname:null,
                talkname:null,
                talkid:null
            }
        }
    },
    methods:{
        chooseorder(e){
            this.theindex=-1
            this.theindexone=e
            if(this.theindexone==0) {
                this.alldynamic=this.thedynamic
            }
            // 我的动态
           else if(this.theindexone==1) {
                var newarr=[]
                this.thedynamic.forEach(item => {
                  if(item.userid==this.userinfo.userid) {
                      newarr.push(item)
                  }  
                });
                this.alldynamic=newarr
            }
            // 点我发布动态
            else if(this.theindexone==2) {
                this.go('/home/newdynamic')
            }
        },
        talkshow(item,index) {
           this.theindex=index
           this.addtalk.replyname=null
           
        },
        reply(talkitem,index) {
            this.theindex=index
            this.addtalk.replyname=talkitem.talkname
            
        },
        async turetalk(item,index) {
            this.addtalk.userid=this.userinfo.userid
            this.addtalk.talkname=this.userinfo.username
            this.addtalk.talkid=item.id
            console.log(this.addtalk)
            var that=this
      await this.$axios.post(this.BasedUrl+"/api/dynamic_talk",{talkinfo:this.addtalk})
        .then(res => {
            if(res.data.success_code==200) {
                this.alldynamic[index].alltalk.push({
                  talkcontent:this.addtalk.talkcontent,
                  talktime:this.nowtime,
                  talkname:this.userinfo.username,
                  theid:item.theid,
                  replyname:this.addtalk.replyname,
                  userid:this.userinfo.userid
                })  
                 this.theindex=-1     
                 this.addtalk.talkcontent=""   
            }
        })
        },
        // 删除评论
       async remove(talkitem,k,index) {
           var that=this
           await this.$axios.post(this.BasedUrl+"/api/removetalk",{id:talkitem.id})
          .then(res => {  
                if(res.data.success_code==200) {
                this.alldynamic[index].alltalk.splice(k,1) 
            }            
        })
     },
     async remove(item,index) {
        var that=this
           await this.$axios.post(this.BasedUrl+"/api/delete_dynamic",{id:item.id})
          .then(res => {  
                if(res.data.success_code==200) {
                this.alldynamic.splice(index,1) 
            }            
        })
    },
        talkoff() {
            this.theindex=-1
        }
    },
    computed:{
        userinfo() {
            console.log(JSON.parse(localStorage.getItem('userinfo')))
            return JSON.parse(localStorage.getItem('userinfo'))
        }
    },
   async mounted() {
        var that=this
      await this.$axios.get(this.BasedUrl+"/api/dynamic")
        .then(res => {
            if(res.data.success_code==200) {
                that.alldynamic=res.data.message
                that.thedynamic=res.data.message
                console.log(that.alldynamic)
            }
        })
    }
}
</script>
<style scoped>
.dynamic {
    background-color: #fff;
    margin: 0.5rem;
}
.top {
    text-align: center;
}
.dynamicone {
    /* background-color: #f4f3f2; */
    margin-top: 0.5rem;
}
.myorder_top {
    font-size: 0.2rem;
    margin-top: 0.2rem;
    border-bottom:0.01rem solid #1ba8df;
    border-top:0.01rem solid #f4f3f2;
    background-color: #fff;
    overflow: hidden;
}
.myorder_top li {
    float: left;
    overflow: hidden;
}
.myorder_top li:hover {
    font-size: 0.25rem;
    color: #1ba8df
}
.myorder_top span{
    overflow: hidden;
    line-height: 0.6rem;
    padding: 0 0.2rem;
}
.myorder_choose {
    border: 0.01rem solid #4bc1f3;
    border-top: 0.03rem solid #4bc1f3;
    border-bottom: none 0;
    background-color: #e8e8e8;
}
.everydy {
    padding: 0.2rem;
    border: 0.01rem solid black;
    font-size: 0.2rem;
    overflow: hidden;
}
.touxiang {
    width: 1rem;
    height: 1rem;
    display: block;
    float: left;
}
.threright {
    margin-left: 1.3rem;
    overflow: hidden;
    position: relative;
}
.splie {
    background-color: chocolate;
    width: 0.6rem;
    text-align: center;
    line-height: 0.3rem;
    height: 0.3rem;
    font-size: 0.15rem;
    position: absolute;
    right: 0.2rem;
    top:0.2rem
}
.threright p {
    margin-top: 0.15rem;
}
.conment {
    padding: 0.2rem;
    overflow: hidden;
}
.conment p {
    line-height: 0.3rem;
}
.conment img {
    width: 1.5rem;
    height: 1.5rem;
    float: left;
    margin-left: 0.1rem;
}
.thetalk {
    font-size: 0.25rem;
    margin-top: 0.2rem;
    margin-left: 75%;
}
.talk {
    margin-top: 0.35rem;
    background-color: #f4f3f2;
    padding: 0.2rem;
}
.talk_one {
    margin-bottom: 0.2rem;
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