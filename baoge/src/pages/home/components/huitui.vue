<template>
  <div class="topkk" @click="gohome">
      <p>回主页面</p>
  </div>
</template>
<script>
export default {
    // name: "huitui"
    methods:{
        gohome() {
            // this.$router.push({path: '/'})
            // 直接公共方法
            this.go('/')
        }
    }
}
</script>
<style scoped>
.topkk{
    width: 0.7rem;
    height: 0.7rem;
    border-radius: 50%;
    background-color: aqua;
    font-size: 0.15rem;
    overflow: hidden;
    text-align: center;
    line-height: 0.7rem;
    position: fixed;
    top: 2rem;
    right: 1.5rem;
}
</style>