<template>
    <div class="reserve">
            <p class="yupiao">&#12288;预票区</p>
            <ul class="yupiao_top">
                <li @click="chooseticket(0)" :class="{choose:this.theindex==0}"><span>全部景点</span></li>
                <li @click="chooseticket(1)" :class="{choose:this.theindex==1}"><span>网红恋地</span></li>
                <li @click="chooseticket(2)" :class="{choose:this.theindex==2}"><span>猜你喜欢</span></li>
                <li @click="chooseticket(3)" :class="{choose:this.theindex==3}" v-if="user_info.Administrator==1"><span>我的景区</span></li>
                <li @click="chooseticket(4)" :class="{choose:this.theindex==4}" v-if="user_info.Administrator==1"><span>发布和管理</span></li>
                
            </ul>
            <div style="background-color: #fff;overflow: hidden;">
                <div v-for="(item,index) in arr" :key="index" class="ticketone" @click="goorder(item)">
                    <img :src="item.productimg" alt="">
                    <p class="title">{{item.producttitle}}</p>
                    <p class="hot">热度：{{item.hot}}</p>
                </div>
               <!--  <div @click="go('/home/addarticle')" v-if="theindex==3&&user_info.Administrator==1&&user_info.Administrator==1" class="ticketone">
                    <img src="/static/imgs/组30@3x.png" alt="">
                    <p>点我发布我的景区信息门票</p>
                </div> -->
            </div>
            
        </div>
</template>
<script>
export default {
    data() {
        return {
            theindex:0,
            arr:[],
            otherarr:[],
        }
    },
    methods:{
        chooseticket(e) {
            this.theindex=e
            // 猜我喜欢类型
            let newarr=[]
            if(this.theindex==0){
                this.theticket()
            }
               else if(this.theindex==1) {
                    this.otherarr.forEach(item => {
                        if(item.type==2){
                            newarr.push(item)
                        }
                    });
                    this.arr=newarr
                    console.log(this.arr)
                }
                else if(this.theindex==2) {
                    this.otherarr.forEach(item => {
                        if(item.type==this.user_info.userlike){
                            newarr.push(item)
                        }
                    });
                    this.arr=newarr
                    console.log(this.arr)
                }
                else if(this.theindex==3){
                     this.otherarr.forEach(item => {
                        if(item.merchantid==this.user_info.userid){
                            newarr.push(item)
                        }
                    });
                    this.arr=newarr
                    console.log(this.arr)
                }
                else if(this.theindex==4) {
                    this.go('/home/addarticle')
                }
        },
        goorder(item) {
            this.$router.push({
                path: '/home/Banner',              
                query:{
                    theid:item.productid
                }
            })
        },
        async theticket() {
                 var that=this
                await this.$axios.get(this.BasedUrl+"/api/jingdian")
                .then(res => {
                     if(res.data.success_code==200)  {
                         that.arr=res.data.message
                        that.otherarr=res.data.message
                        console.log(that.arr)
                      }  
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    computed: {
        thekeyword() {
            return this.$store.state.keyword;
        },
        user_info() {
            return JSON.parse(localStorage.getItem('userinfo'))
        }
    },
    watch: {
        thekeyword() {
            if(this.thekeyword=="") {
                this.arr=this.otherarr
                console.log("请输入关键字")
            }
            else {
                var newinfo=[]
            this.otherarr.forEach(item => {
                if(item.producttitle.includes(this.thekeyword)) {
                    newinfo.push(item)
                }
            });
            this.arr=newinfo
            }  
        }
    },
    async mounted() {
    this.theticket()
    }
}
</script>
<style scoped>

.reserve {
    background-color: #f4f3f2;
    padding: 0.2rem 1rem;
    overflow: hidden;
}
.yupiao {
    font-size: 0.3rem;
    color: #2c323b;
    border-left: 0.1rem solid #1ba8df
}
.yupiao_top {
    font-size: 0.2rem;
    margin-top: 0.2rem;
    border-bottom:0.01rem solid #1ba8df;
    border-top:0.01rem solid #f4f3f2;
    background-color: #fff;
    overflow: hidden;
}
.yupiao_top li {
    float: left;
    overflow: hidden;
}
.yupiao_top li:hover {
    font-size: 0.25rem;
    color: #1ba8df
}
.yupiao_top span{
    overflow: hidden;
    line-height: 0.6rem;
    padding: 0 0.2rem;
}
.choose {
    border: 0.01rem solid #4bc1f3;
    border-top: 0.03rem solid #4bc1f3;
    border-bottom: none 0;
    background-color: #e8e8e8;
}
.ticketone {
    padding: 0.1rem;
    overflow: hidden;
    float: left;
    width: 1.5rem;
    border: 0.01rem solid #f4f3f2;
}
.ticketone img{
    width: 1.5rem;
    height: 1.5rem;
    display: block;
}
.title {
    font-size: 0.15rem;
    line-height: 0.3rem;
    min-height: 0.6rem;
    overflow: hidden;  /** 隐藏超出的内容 **/
    word-break: break-all;
    text-overflow: ellipsis; /** 多行 **/
    display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
    -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
    -webkit-line-clamp: 2; /** 显示的行数 **/
    text-align: center
}
.hot {
    color: #ff5500;
    font-size: 0.15rem;
    text-align: center;
}
.ticketone:hover {
    background-color: #e8e8e8;
}
</style>