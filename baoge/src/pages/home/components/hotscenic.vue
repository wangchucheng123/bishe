<template>
    <div class="Hotscenic">
            <p class="theH">&#12288;景点美文</p>
            <div class="thetop" @click="detail(item)" v-for="(item,index) in writing" :key="index" >
                <img :src="item.topimg" alt="">
                <div class="particulars">
                    <p>{{item.articletitle}}</p>
                    <div>
                        <span>发表者 ：{{item.articleuser}}</span>
                        <span>发表时间 ：{{item.articleDate}}</span>
                    </div>
                    <div>
                        <span class="iconfont topee">&#xe63a; {{item.url.length}}</span>
                        <span class="iconfont topee">&#xe64f; {{item.lookman}}</span>
                    </div>
                </div>
            </div>

        </div>
</template>
<script>
export default {
    data() {
        return{
            writing:[]
        }
    },
    methods: {
        detail(item) {
            this.$router.push({
                path: '/home/hotparticulars',              
                query:{
                    theid:item.id
                }
            })
        },

    },
    async mounted() {
        var that =this
        await this.$axios.get(this.BasedUrl+"/api/goodarticle")
            .then(res => {
                if(res.data.success_code==200)  {
                          that.writing=res.data.message
                      }  
            })

    }
}
</script>
<style scoped>

.Hotscenic {
    background-color: #f4f3f2;
    padding: 0.2rem 1rem;
}
.theH{
    font-size: 0.3rem;
    color: #2c323b;
    border-left: 0.1rem solid #1ba8df
}
.thetop {
    background-color: #fff!important;
    padding: 0.3rem;
    margin-top: 0.3rem;
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
    margin-left: 1.4rem;
    display: flex;
    flex-direction:column;
}
.particulars P {
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
.particulars P:hover{
    color: #1ba8df;
    font-size: 0.22rem;
}
.particulars span {
    font-size: 0.16rem;
    margin-right: 0.3rem
}
.topee {
    color: #e8e8e8
}
</style>