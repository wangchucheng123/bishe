<template>
  <!-- 发布动态 -->
  <div class="aaa">
    <textarea
      v-model="addtalk.talkcontent"
      placeholder="说点什么吧..."
      id
      cols="30"
      rows="15"
      maxlength="1500"
    ></textarea>
<div class="imginput">
    <input
        accept="image/*"
        @change="AddImage($event,k=1)"
        ref="ImageInputtwo"
        name="img"
        id="upload_file"
        type="file"
        style="display:none;"
    />
    <div style="float: left;overflow: hidden;" v-for="(items,indexss) in guideimg" :key="indexss">
        <img class="rizhi_img" :src="items"  @click="onshowone(indexss)" />
        <span @click="splieimg(items,indexss)" v-if="activeIndexone==indexss" class="thex">x</span>
    </div>
    <img src="/static/imgs/组30@3x.png" @click="$refs.ImageInputtwo.click()" />
</div>
    <div class="queding">
      <span @click="turetalk()" style="background-color: #2d78f4;color:#fff;">确定</span>
    </div>
  </div>
</template>
<script>
export default {
    data() {
        return {
            addtalk :{
                talkcontent:null,
                imgs:[],
                thetime:this.nowtime,
                username:null,
                userid:null,
                userpoint:null
            },
            guideimg:[],
            photo:[],
            activeIndexone:-1
        }
    },
    methods:{
        async turetalk() {
            var that=this
            this.addtalk.username=this.userinfo.username
             this.addtalk.userid=this.userinfo.userid
            this.addtalk.userpoint=this.userinfo.userpoint
            console.log(this.addtalk)
            // 获取图片
            let config = {
             headers: { "content-type": "multipart/form-data" ,}}
            var formData = new FormData();
         for (let i = 0; i < this.photo.length; i++) {
         formData.append('file', this.photo[i])
      }        
            await this.$axios.post(this.BasedUrl+"/api/tupian",formData,config)
        .then(res => { 
               if(res.data.success_code==200) {
                   this.addtalk.imgs=res.data.message
               }
        })
        // 发布接口
        await this.$axios.post(this.BasedUrl+"/api/add_dynamic",{allinfo:this.addtalk})
        .then(res => {
            if(res.data.success_code==200) {
                   console.log("成功")
                   this.go('/home/dynamic')
               }
        })
        },
        AddImage(e) {
                let that = this;
                // //e.target指本身 ,e.dataTransfer.files拖拽上传图片
                var files = e.target.files || e.dataTransfer.files;
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
                        that.guideimg.push (e.target.result);
                        that.photo.push(files[0]);
                    };
                    reader.readAsDataURL(files[i]);
                }
            },
            splieimg(items,indexss) {
                this.photo.splice(indexss,1)
                this.guideimg.splice(indexss,1)  
            },
            onshowone(index) {
                console.log(index)
             this.activeIndexone = index;
             console.log(this.activeIndexone)
             let _this=this
            setTimeout(function()  {
                _this.activeIndexone =-1
            }, 3000);
        },
      
    },
    computed: {
        userinfo() {
             console.log(JSON.parse(localStorage.getItem('userinfo')))
            return JSON.parse(localStorage.getItem('userinfo'))
        }
    }
    
}
</script>
<style scoped>
.aaa {
   margin: 1rem;
   padding: 0.2rem;
   border: 0.01rem solid #2d78f4;
   overflow: hidden;
}
.aaa textarea{
  height: 3.5rem;
  padding: 0.1rem;
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
  float: right;
}
.rizhi_img {
    position: relative;
}
.imginput img {
    width: 1.2rem;
    height:1.2rem;
    display: block;
    float: left;
    margin-right: 0.1rem;
}
.thex {
    background-color: #e4e3e2;
    text-align: center;
    color: red;
    height: 0.4rem;
    width: 0.4rem;
    position: relative;
    right: 0.2rem;
}
</style>