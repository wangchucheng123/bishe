<template>
    <div >
        <!-- 景点轮播图 -->
        <div class="waihezi">
            <img v-show="i==index" v-for="(item,i) in arr.img" :key="i" :src="item" />
              <ul class="quan">
              <li v-for="(item,i) in arr.img" :key="i" :class="{dian:i==index}"></li>
            </ul>
        </div>
        <!-- 订单信息 -->
        <div class="info">
          <h4>订单信息：</h4>
          <p>游玩标题：{{arr.title}}</p>
          <p>总价格：{{arr.price}}</p>
          <p>出行人数：{{arr.menber}}</p>
          <p>联系人：{{arr.contactman}}</p>
          <p>联系电话：{{arr.phone}}</p>
          <p>票种类型：{{arr.stude_m}}</p>
          <p>是否有导游：{{arr.tourguide}}</p>
          <p>是否已经出行：<span v-if="arr.state==1">是</span><span v-else>否</span></p>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      index: 0,
      arr: {},
    };
  },
  async mounted() {
    //计时器自动轮播
    setInterval(() => {
      this.index++;
      //index从0开始的
      if (this.index >= this.arr.img.length) this.index = 0;
    }, 2500)
    var that=this
    var id=this.$route.query.theid
    await this.$axios.get(this.BasedUrl+"/api/getorder",{params:{ID:id}})
      .then(res => {
        if(res.data.success_code==200) {
          that.arr=res.data.message[0]
          console.log(that.arr)
        }
        
      })
      .catch(err => {
        console.log(err);
      });
  },


}
</script>
<style scoped>
.waihezi {
  margin: 1rem;
  height: 3.5rem;
  position: relative;
  display: flex;
  justify-content: center;
}
.waihezi img {
  height: 100%;
  width: 100%;
}
.quan {
  display: flex;
  position: absolute;
  bottom: 10px;
  display: flex;
  align-items: center
}
.quan li {
  width: 0.1rem;
  height: 0.1rem;
  border-radius: 50%;
  margin: 0px 0.2rem;
  list-style: none;
  background-color: #333333;
}

.dian {
  background-color: red!important;
  width: 0.15rem!important;
  height: 0.15rem!important;
}
.info {
  margin:0.5rem 2rem;
  border: 0.01rem solid #1ba8df;
  padding: 0.2rem;
  
}
.info p{
  font-size: 0.2rem;
  line-height: 0.3rem;
  margin-top: 0.1rem;
}
</style>