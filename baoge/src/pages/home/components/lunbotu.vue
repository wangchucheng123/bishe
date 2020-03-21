<template>
  <div>
    <div id="app">
      <div class="waihezi">
        <img v-show="i==index" v-for="(item,i) in arr" :key="i" :src="item.url" />
        <ul class="quan">
          <li v-for="(item,i) in arr" :key="i" :class="{dian:i==index}"></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      index: 0,
      arr: [],
    };
  },
  async mounted() {
    //计时器自动轮播
    setInterval(() => {
      this.index++;
      //index从0开始的
      if (this.index >= this.arr.length) this.index = 0;
    }, 2500)

    var that=this
    await this.$axios.get(this.BasedUrl+"/api/homecasual")
      .then(res => {
        if(res.data.success_code==200) {
          that.arr=res.data.message
        }
        
      })
      .catch(err => {
        console.log(err);
      });
  },
  // created() {
   
  // }



}
</script>
<style scoped>
.waihezi {
    width: 100%;
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
</style>