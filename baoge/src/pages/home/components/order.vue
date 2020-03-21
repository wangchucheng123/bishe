<template>
    <div class="order">
            <p class="myorder">&#12288;我的订单</p>
            <ul class="myorder_top">
                <li @click="chooseorder(0)" :class="{myorder_choose:this.myorder_index==0}"><span>全部订单</span></li>
                <li @click="chooseorder(1)" :class="{myorder_choose:this.myorder_index==1}"><span>待出行订单</span></li>
                <li @click="chooseorder(2)" :class="{myorder_choose:this.myorder_index==2}"><span>已出行订单</span></li>
            </ul>
            <div style="background-color: #fff;overflow: hidden;">
                <div class="thetop" v-for="(item,index) in orderinfo" :key="index" @click="goinfo(item)">
                    <img :src="item.img[0]" alt="">
                    <div class="particulars">
                        <p class="title">{{item.title}}</p>
                        <div>
                            <span>联系人 ：<span style="color:#495f8c">{{item.contactman}}</span></span>
                            <span>是否需要导游 ：<span style="color:#495f8c">{{item.tourguide}}</span></span>
                            <span>人数 ：<span style="color:#495f8c">{{item.menber}}人</span></span>
                            <span>出行时间 ：<span style="color:#495f8c">{{item.gotime}}</span></span>
                            <p @click.stop="queren(item,index)" v-if="item.state==0" style="background-color: #1ba8df;" class="butt">确认出行</p>
                            <p v-else style="background-color: #f4f3f2;" class="butt">已出行</p>
                        </div>
                    </div>
              </div>
              <p style="padding:1rem" v-if="orderinfo.length==0">还没有相关订单喔</p>
            </div>
    </div>        
</template>
<script>
export default {
    data() {
        return {
            myorder_index:0,
            orderinfo:[],
            otherarr:[]
        }
    },
    methods:{
        chooseorder(e) {
            this.myorder_index=e
            if(this.myorder_index==0) {
                this.orderinfo=this.otherarr
            }
           // 待出行
            else if(this.myorder_index==1) {
                var arr=[]
                this.otherarr.forEach(item => {
                    if(item.state==0) {
                        arr.push(item)
                    }
                });
                this.orderinfo=arr
            }
            else if(this.myorder_index==2){
                var arr=[]
                // 已经出行
                this.otherarr.forEach(item => {
                    if(item.state==1) {
                        arr.push(item)
                    }
                });
                this.orderinfo=arr
            }
        },
       async queren(item,index) {
            await this.$axios.post(this.BasedUrl+"/api/Confirm",{id:item.id})
                    .then(res => {
                      if(res.data.success_code==200)  {
                          item.state=1
                      }                      
                    })
                    .catch(err => {
                    });
        },
        goinfo(item){
            this.$router.push({
                path: '/home/orderinfo',              
                query:{
                    theid:item.id
                }
            })
        }
    },
   async mounted() {
        var that =this
        // 传空值代表查所有数据
        await this.$axios.get(this.BasedUrl+"/api/getorder",{params: {ID: null }})
            .then(res => {
                if(res.data.success_code==200) {
                    that.orderinfo=res.data.message
                    this.otherarr=res.data.message
                    console.log(that.orderinfo)
                }
                
     
            })
    }
}
</script>
<style scoped>
.order {
    background-color: #f4f3f2;
    padding: 0.2rem 1rem;
    overflow: hidden;
}
.myorder {
    font-size: 0.3rem;
    color: #2c323b;
    border-left: 0.1rem solid #1ba8df
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

.thetop {
    background-color: #fff!important;
    padding: 0.3rem;
    border-bottom: 0.02rem solid #e8e8e8;
    overflow: hidden;
}
.thetop img {
    width: 1.2rem;
    height: 1.2rem;
    display: block;
    float: left;
}
.particulars {
    float: left;
    margin-left: 0.2rem;
    display: flex;
    flex-direction:column;
}
.title {
    color: #444;
    font-weight: bold;
    font-size: 0.2rem;
    line-height: 0.3rem;
    overflow: hidden;  /** 隐藏超出的内容 **/
    word-break: break-all;
    text-overflow: ellipsis; /** 多行 **/
    display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
    -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
    -webkit-line-clamp: 2; /** 显示的行数 **/
}
.title:hover{
    color: #1ba8df;
    font-size: 0.22rem;
}
.particulars span {
    font-size: 0.16rem;
    margin-right: 0.1rem
}
.butt {
    width: 0.6rem;
    height: 0.3rem;
    font-size: 0.15rem;
    line-height: 0.3rem;
    text-align: center;
    margin-top: 0.2rem;
    
}
</style>