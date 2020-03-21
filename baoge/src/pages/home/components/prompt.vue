<template>
    <div class="thetime" >
        {{tishi}}
      </div>
</template>
<script>
export default {
    props :{
        tishi:String
    },
    data() {
        return {
            
        }
    }
}
</script>
<style  scoped>
.thetime {
  border-radius: 0.02rem;
  width: 2rem;
  height: 0.8rem;
  background-color: #f4f3f2;
  color: red;
  font-size: 0.2rem;
  text-align: center;
  line-height: 0.8rem;
}
</style>