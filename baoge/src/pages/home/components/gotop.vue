<template>
<div>
    <div class="theborder">
        <div @mouseenter="onMouseOverll(0)" @mouseleave="onMouseoutll(0)" class="border_one" style="border-bottom: 0.01rem solid #f4f3f2;">
            <p class="iconfont">&#xe858;</p>
            <p>在线客服</p>
        </div>
        <div @mouseenter="onMouseOverll(1)" @mouseleave="onMouseoutll(1)" class="border_one" style="border-bottom: 0.01rem solid #f4f3f2;">
            <p class="iconfont">&#xe688;</p>
            <p>联系我们</p>
        </div>
        <div class="border_one" @click="thetop">
            <p class="iconfont">&#xe62f;</p>
            <p>回到顶端</p>
        </div>
    </div>
    <div v-if="thetwo" class="dianhua">
        电话：17344587873
    </div>
    <div v-if=" theone" class="paidui">
        目前在线排队人数：6人
    </div>
</div>
    
</template>
<script>
export default {
    data() {
        return{
            theone:false,
            thetwo:false
        }
    },
    methods:{
        onMouseOverll(e) {
            if(e==0) {
                this.theone=true
            }
            else{
                this.thetwo=true
            }
            
        },
        onMouseoutll(e) {
            if(e==0) {
                this.theone=false
            }
            else{
                this.thetwo=false
            }
            
        },
        thetop() {
            // 给顶部div设置id="content"就可以了
             content.scrollIntoView()
        }
    }
}
</script>
<style scoped>
.theborder {
    width: 0.5rem;
    height: 1.3rem;
    font-size: 0.2rem;
    border: 0.02rem solid #f4f3f2;
    position: fixed;
    right: 0.3rem;
    bottom: 0.8rem;
    background-color: #fff;
}
.border_one {
    width: 100%;
    text-align: center;
}
.border_one p:nth-child(2) {
    font-size: 0.08rem;
    margin: 0.08rem 0
}
.border_one:hover {
    color: red;
}
.dianhua {
    font-size: 0.15rem;
    border: 0.01rem solid #f4f3f2;
    padding: 0.12rem;
    background-color: #fff;
    position: fixed;
    right: 0.85rem;
    bottom: 1.25rem;
}
.paidui {
    font-size: 0.15rem;
    border: 0.01rem solid #f4f3f2;
    padding: 0.12rem;
    background-color: #fff;
    position: fixed;
    right: 0.85rem;
    bottom: 1.67rem;
}
</style>