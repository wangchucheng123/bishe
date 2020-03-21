<template>
    <div>
            <div class="time">
                <span>在此输入您的问题或留言：</span>
            </div>
            <div class="teo">
                <div class="rich">
          <!-- maxlength设计最大字数 auto-height="ture"是高度随字数增加而增加-->
          <textarea
            placeholder="不能超过2000字"
            maxlength="2000"
            auto-height="ture"
          ></textarea>
        </div>
        <!-- web -->
      <div class="tupian"> 
      <input
        accept="image/*"
        @change="AddImage($event)"
        ref="ImageInput"
        name="img"
        id="upload_file"
        type="file"
        style="display:none;"
      />
      <img
        class="rizhi_img"
        v-for="(items,index) in Images"
        :key="index"
        :src="items"
      />
      <img src="/static/imgs/组30@3x.png" @click="$refs.ImageInput.click()" />
    </div>
    </div>
    <button class="buttu" @click="but">提交</button>
    <prompt v-if="choosetime" :tishi="tishi"></prompt>
    <huitui></huitui>
    </div>
</template>
<script>
import prompt from './components/prompt'
export default {
    data() {
        return {
          choosetime:false,
          Images:[],
          tishi:"信息已经提交，请等候我们的工作人员的通知!",
        }
    },
    components:{
        prompt
    },
    methods:{
        but() {
          this.choosetime=true
          let _this = this;
          setTimeout(function() {
          _this.choosetime = false;
          _this.$router.push({path: '/'})
        }, 400);
            
        },
          // web
    AddImage(e) {
      console.log(555)
      let that = this;
      // //e.target指本身 ,e.dataTransfer.files拖拽上传图片
      var files = e.target.files || e.dataTransfer.files;
      console.log(files)
      if (!files.length) return; //if(!false) return 条件成立的时候返回
      // 使用HTML5的FileReader接口，即可完全在页面里读取文件了
      // FileReader专门用于读取文件 判断你的浏览器是否支持FileReader接口
      if (typeof FileReader === "undefined") {
        alert("您的浏览器不支持图片上传，请升级您的浏览器");
        return false;
      }
      var reader = new FileReader();
      for (var i = 0; i < files.length; i++) {
        // FileReader接口中的readAsDataURL()方法可以获取API异步读取的文件数据，另存为数据URL;
        //将该URL绑定到img标签的src属性上，就可以实现图片的上传预览效果了
        reader.onload = function(e) {
           that.Images.push (e.target.result);
           var strarr = e.target.result.split(",");
           var filebase64 = strarr[1];//切割Data URI scheme。获得的图片文件的base64字符串用于上传
           that.ProjectInfo.Images.push({
             FileName: `Images`,
              MediaType: "image/png",
              Buffer: filebase64
           })
        };
        reader.readAsDataURL(files[i]);
      }
    },

    },
}
</script>
<style scoped>
.rich {
  margin-top: 0.41rem;
  overflow: hidden;
  padding: 0.43rem;
  /* 设计四个边框 */
  outline: 0;
}
.time {
    width: 2.4rem;
    line-height: 0.25rem;
    font-size: 0.2rem;
    margin: 0.2rem;
    border-bottom: 0.02rem solid #f4f3f2;
    margin: 0.2rem auto
}
.teo {
    width: 5rem;
    margin: 0 auto;
    background-color: #f4f3f2;
    overflow: hidden;
    border-radius: 0.05rem
}
.rich textarea {
  /* 给高度设置一个最低限制 */
  width: 100%;
  min-height: 4rem;
  height: auto;
  font-size: 0.2rem;
  /* 下面二个都是自动换行的，但是word-wrap如果
  在最后长度不够会自动保留单
  次字体的完整性换行到下一行 */
  word-wrap: break-word;
  word-break: break-all;
  padding: 0.1rem
}
/* 点击弹出框背景 */
.layout {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
}

.tupian {
  float: left;
  margin-left: 0.31rem;
  margin-bottom: 0.3rem;
  overflow: hidden;
}
.tupian img {
  float: left;
  width: 1rem;
  height: 1rem;
  padding-right: 0.1rem;
  padding-top: 0.1rem;
  display: block;
}
.rizhi_img:nth-child(5n) {
  padding-right: 0;
}
.buttu {
    width: 0.8rem;
    height: 0.4rem;
    border-radius: 0.05rem;
    margin-top: 0.5rem;
    margin-left: 7rem

}
</style>