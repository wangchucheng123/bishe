<template>
    <div id="content" style="background:#fff;">
      <div style="height:0.3rem;"></div>
      <div style="height:1.2rem;">
        <h1 style="color:red;" align="center">用户反馈</h1>
        <hr size="2" color="red" />
        <p style="font-size:0.14rem;padding:0 0.3rem">
          亲爱的用户：
          <br />
          <br />真诚希望您能够给我们改进的不断完善的机会喔，十分感谢呢
        </p>
      </div>
      <form>
        <div style="border:0.02rem solid #ccc;  height:11rem; background:#f8f8f8; padding:0.2rem; ">
          <!--用户反馈表单-->
          1.您的账号名是？
          <input type="text" id="name" placeholder="请输入账号名" />
          <br />2.您常用电话号码是？
          <input type="text" id="phone" placeholder="请输入电话号码" />
          <br />3.您对目前当当网首页的整体满意度如何？
          <br />
          <input type="radio" name="contentment" value="满意" />满意
          <br />
          <input type="radio" name="contentment" value="一般" />一般
          <br />
          <input type="radio" name="contentment" value="不满意" />不满意
          <br />4.您访问页面速度的情况是？
          <br />
          <input type="radio" name="speed" value="很快" />很快
          <br />
          <input type="radio" name="speed" value="一般" />一般
          <br />
          <input type="radio" name="speed" value="较慢" />较慢
          <br />5.您从哪里知道同城玩网页的呢
          <br />
          <input type="checkbox" value />朋友推荐
          <br />
          <input type="checkbox" value />线下传单
          <br />
          <input type="checkbox" value />线上广告
          <br />其他渠道：
          <input type="text" placeholder="请输入" />
          <br />6.您的意见与建议？
          <br />
          <textarea name="suggest" cols="50" rows="4"></textarea>
          <br />
          <br />7.你住在哪个城市？
          <select size="1">
            <option value="beijing">北京</option>
            <option value="shanghai">上海</option>
            <option value="shenzhengs">深圳</option>
            <option value="guangzhou">广州</option>
          </select>

          <!-- <select size="2">
            <option value="beijing">北京</option>
            <option value="shanghai">上海</option>
            <option value="shenzhengs">深圳</option>
            <option value="guangzhou">广州</option>
          </select> -->
          <br />
          <br />
          <br />8.你喜欢去哪旅游呢？
          <select size="8">
            <optgroup label="景点类型">
              <option value="beijing">历史文化</option>
              <option value="shanghai">世外桃源</option>
              <option value="shenzhengs">淳朴民风</option>
              <option value="guangzhou">浪漫美好</option>
            </optgroup>
            <optgroup label="其它">
              <option value="beijing">出国游</option>
              <option value="shanghai">度假村</option>
              <option value="shenzhengs">跟团</option>
            </optgroup>
          </select>
          <br />
          <br />
          <br />9.上传你的头像？
          <input type="file" />
          <br />
          <br />
          <button type="submit" @click="tijiao">提交</button>
        </div>
      </form>
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
            tishi:"感谢您的支持，祝你生活愉快"
        }
    },
    components:{
        prompt
    },
    methods:{
        tijiao(){
            this.choosetime=true
          let _this = this;
          setTimeout(function() {
          _this.choosetime = false;
          _this.$router.push({path: '/'})
        }, 400);
            
        }
    }
}
</script>
<style scoped>
/*content部分*/
#content{margin:10px auto; }
body, div, a, img, h1, h2, h3, h4, h4, h5, p, ol, ul, li, dl, dt, dd {
    margin: 0;
    padding: 0;
    list-style: none;
    border: none;
    font-size: 0.2rem
}
input {
    margin: 0.1rem
}
</style>