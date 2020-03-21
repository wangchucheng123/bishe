<template>
    <div>
        <div class="theborder">
            <p id="there" class="title">在此输入您的景点相关信息</p>
            <div>
                <ul>
                    <li class="theone">
                        <p>景点标题：</p>
                        <!-- maxlength设计最大字数 auto-height="ture"是高度随字数增加而增加-->
                    <textarea
                        placeholder="不能超过200字"
                        maxlength="200"
                        autoHeight="true"
                        style="height: 0.47rem;"
                        v-model="allscenic.title"
                    ></textarea>
                    </li>
                    <li class="theone">
                        <p>景点介绍：</p>
                        <!-- maxlength设计最大字数 auto-height="ture"是高度随字数增加而增加-->
                    <textarea
                        placeholder="不能超过1000字"
                        maxlength="1000"
                        autoHeight="true"
                        style="height: 1.5rem;"
                         v-model="allscenic.introduce"
                    ></textarea>
                    </li>
                    <li class="theone">
                        <p>景点路线：</p>
                        <!-- maxlength设计最大字数 auto-height="ture"是高度随字数增加而增加-->
                    <textarea
                        placeholder="输入完每条路线后添加"
                        maxlength="500"
                        autoHeight="true"
                        style="height: 0.5rem;"
                         v-model="oneway"
                    ></textarea>
                     <p class="add" @click="addoneway">添加</p>
                    </li>
                    <li class="theone">
                        <p>你添加的路线：</p>
                        <!-- maxlength设计最大字数 auto-height="ture"是高度随字数增加而增加-->
                        <div class="luxian" v-for="(item,indexhu) in allscenic.way" :key="indexhu+'one'">
                            <span class="iconfont yuanquan">&#xe674;</span>
                            <p style=" flex:1;">{{item}}</p>
                            <span class="yichu" @click="yichu(item,indexhu)">移除</span>
                        </div>
                    </li>
                    <li class="theone">
                    <p>旅游类型:</p>
                    <label v-for="(item,indexll) in list" :key="indexll+'two'">
                        <input style="zoom:4"  type="radio" name="test" :value="indexll" v-model="allscenic.type" />
                        {{item.value}}
                    </label>
                   </li>
                   <li class="theone">
                        <p>景点热度：</p>
                        <input type="text" placeholder="输入数字" v-model="allscenic.hot">
                    </li>
                   <li class="theone">
                        <p>门票价格：</p>
                        <input type="text" placeholder="输入数字" v-model="allscenic.pirce">
                    </li>
                    <li class="theone">
                        <p>景点图片：</p>
                        <input
                            accept="image/*"
                            @change="AddImage($event,k=0)"
                            ref="ImageInput"
                            name="img"
                           
                            id="importFile"
                            type="file"
                            style="display:none;"
                        />
                        <div style="float: left;overflow: hidden;" v-for="(items,onindex) in Images" :key="onindex+'three'"  @click="onshow(onindex)">
                            <img class="rizhi_img" :src="items"/>
                            <span @click="splieimg(items,onindex,k=0)" v-show="activeIndex===onindex" class="thex">x</span>
                        </div>
                        <!-- 编辑状态的图 -->
                        <div style="float: left;overflow: hidden;" v-for="(items,indexqq) in compileImages" :key="indexqq+'four'" @click="onshowoneoher(indexqq)">
                            <img class="rizhi_img" :src="items" />
                           <span @click="splieimgone(items,indexqq,k=0)" v-show="oneindex===indexqq" class="thex">x</span>
                        </div>

                        <img src="/static/imgs/组30@3x.png" @click="$refs.ImageInput.click()" />
                    </li>
                    <li class="theone">
                        <p>景点游玩攻略图（游玩指南,1张）：</p>
                        <input
                            accept="image/*"
                            @change="AddImage($event,k=1)"
                            ref="ImageInputtwo"
                            name="img"
                            id="upload_file"
                            type="file"
                            style="display:none;"
                        />
                        <div style="float: left;overflow: hidden;" v-for="(items,indexss) in guideimg" :key="indexss+'five'" @click="onshowone(indexss)">
                            <img class="rizhi_img" :src="items" />
                           <span @click="splieimg(items,indexss,k=1)" v-show="activeIndexone===indexss" class="thex">x</span>
                        </div>
                        <!-- 编辑状态的图 -->
                        <div style="float: left;overflow: hidden;" v-for="(items,index) in compileimg" :key="index+'six'" @click="theonshowone(index)">
                            <img class="rizhi_img" :src="items" />
                           <span @click="splieimgone(items,index,k=1)" v-show="otherindex===index" class="thex">x</span>
                        </div>
                        
                        <img src="/static/imgs/组30@3x.png" @click="$refs.ImageInputtwo.click()" />
                    </li>
                    <li class="theone">
                        <p class="fabu" @click="release">发布</p>
                    </li>
                </ul>
            </div>
        </div>
        
    <!-- 我的景点 -->
    <div class="thebottom">
        <p class="tureadd">已发布的景点信息</p>
        <div class="thebottom_one" v-for="(item,twoindex) in myjingdain" :key="twoindex+'seven'" >
            <img :src="item.productimg" alt="">
            <div class="theright">
                <p>{{item.producttitle}}</p>
                <p>定价：{{item.price}}</p>
                <p v-if="item.type==0">类型：民族风</p>
                <p v-else-if="item.type==1">类型：历史感</p>
                <p v-else-if="item.type==2">类型：网红热</p>
                <p v-else-if="item.type==3">类型：浪漫区</p>
                <p v-else>类型：美景类</p>
            </div>
            <div class="zhuangtai">
                <p @click="compile(item,twoindex)">编辑</p>
                <p @click="Delete(item,twoindex)">删除</p>
            </div>
        </div>
    </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            list:[{value:"民族风"},{value:"历史感"},{value:"网红热"},{value:"浪漫区"},{value:"美景类"}],
            Images:[],
            guideimg:[],
            compileImages:[],
            compileimg:[],
            // user_info:null,
            allscenic:{
                title:null,
                introduce:null,
                way:[],
                type:null,
                hot:null,
                pirce:null,
                photo:[],
                merchantid:null
            },
            tupian:[],
             photo:[],
             oneway:null,
             activeIndex: -1, // 初始化点击的索引值  
             activeIndexone:-1,
            //  编辑状态的图片索引
            oneindex:-1,
            otherindex:-1,
             myjingdain:[],
             compileindex:1,
             scenicid:null,
             scenicindex:null
        }
    },
    // created() {

    //     this.user_info=JSON.parse(localStorage.getItem('userinfo'))
    // },
    computed:{
        // user_info() {
        //     console.log(JSON.parse(localStorage.getItem('userinfo')))
        //     return JSON.parse(localStorage.getItem('userinfo')) 
        // }
    },
    methods:{
        onshow(index) {
             this.activeIndex = index;
             let _this=this
            setTimeout(function()  {
                _this.activeIndex =-1
            }, 3000);
        },
        onshowoneoher(index) {
            this.oneindex = index;
             let _this=this
            setTimeout(function()  {
                _this.oneindex =-1
            }, 3000);
        },
        theonshowone(index) {
            this.otherindex = index;
             let _this=this
            setTimeout(function()  {
                _this.otherindex =-1
            }, 3000);
        },
        onshowone(index) {
             this.activeIndexone = index;
             let _this=this
            setTimeout(function()  {
                _this.activeIndexone =-1
            }, 3000);
        },
        // 编辑状态的图片
        splieimgone(items,index,k) {
            if(k==0) {
                this.compileImages.splice(index,1)
            }else {
                this.compileimg.splice(index,1)
            }
        },
        splieimg(items,index,k) {
            if(k==0) {
                this.photo.splice(index,1)
                this.Images.splice(index,1)
            }else{
                this.tupian.splice(index,1)
                this.guideimg.splice(index,1)
            }
           
        },
        yichu(item,index) {
            this.allscenic.way.splice(index,1)
        },
        addoneway() {
            if(this.oneway!=null) {
                this.allscenic.way.push(this.oneway)
                this.oneway=null
            }            
        },
        AddImage(e,k) {
            console.log(k)
            if((k==1&&this.tupian.length>0)||(k==1&&this.compileimg.length>0)) {
                console.log("攻略图只能上传一张")
            }
            else {
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
                    if(k==0) {
                        that.Images.push (e.target.result);
                        that.photo.push(files[0]);
                    }
                    else if(k==1) {
                        that.guideimg.push(e.target.result);
                        that.tupian.push(files[0]);
                    }
                    };
                    reader.readAsDataURL(files[i]);
                }
            }
      
    },
   async release() {
       this.allscenic.merchantid=JSON.parse(localStorage.getItem('userinfo')).userid
         var that=this
         let config = {
             headers: {
                 "content-type": "multipart/form-data" ,
             }
         }
        //  把攻略图放到数组第一的对象，返回去服务端一起处理
         that.photo.unshift(that.tupian[0]) 
         console.log(that.photo)
         var formData = new FormData();
         for (let i = 0; i < this.photo.length; i++) {
         formData.append('file', this.photo[i])
      }        
            await this.$axios.post(this.BasedUrl+"/api/tupian",formData,config)
        .then(res => {
             if(res.data.success_code==200)  {     
               console.log(res.data.message)   
               this.allscenic. photo=res.data.message
          }
            
        })
        // 编辑的图
        if(this.compileimg.length>0){
                    // 证明这个攻略图没有改变，确保第一张图片是攻略图
                    this.allscenic. photo.unshift(this.compileimg[0])
                }
                // 这里把原来的照片push进去
        this.compileImages.forEach(item => {
            this.allscenic. photo.push(item)
        });
        if(this.allscenic.title!=null&&this.allscenic.introduce!=null&&this.allscenic.way.length>0&&this.allscenic.type!=null&&this.allscenic.hot!=null&&this.allscenic.pirce!=null&&this.allscenic.photo.length>0&&this.allscenic.merchantid!=null) {  
            if(this.compileindex==0) {
                // 编辑
                this.compileindex++  //这里确保重新改变这个值 
                console.log(this.allscenic,"11 H1`")
                await this.$axios.post(this.BasedUrl+"/api/compile_scenic",{allinfo:this.allscenic,id:this.scenicid})
            .then(res => {
                if(res.data.success_code==200) {
                    this.myjingdain[this.scenicindex].productimg=this.allscenic.photo[1]
                    this.myjingdain[this.scenicindex].producttitle=this.allscenic.title
                    this.myjingdain[this.scenicindex].price=this.allscenic.pirce
                    this.myjingdain[this.scenicindex].type=this.allscenic.type
                    // 清空内容
                    this.allscenic.title=null
                    this.allscenic.introduce=null
                    this.allscenic.way=null
                    this.allscenic.type=null
                    this.allscenic.hot=null
                    this.allscenic.pirce=null
                    this.compileimg=[]
                    this.guideimg=[]
                    this.Images=[]
                    this.compileImages=[]
                }
                })          }
            else {
                //发布景点
                await this.$axios.post(this.BasedUrl+"/api/add_scenic",{allinfo:this.allscenic,})
            .then(res => {
                 if(res.data.success_code==200) {
                     this.myjingdain.push({
                         productimg:this.allscenic.photo[1],
                         producttitle:this.allscenic.title,
                         price:this.allscenic.pirce,
                         type:this.allscenic.type
                     })
                     // 清空内容
                    this.allscenic.title=null
                    this.allscenic.introduce=null
                    this.allscenic.way=null
                    this.allscenic.type=null
                    this.allscenic.hot=null
                    this.allscenic.pirce=null
                    this.guideimg=[]
                    this.Images=[]
                 }                           
                })
                .catch(err => {
                });
            } 
        } 
        else{
            console.log("请填完全信息")
        }
    },
     async Delete(item,index) {
         // 删除某条景点
      var that=this
      await this.$axios.post(this.BasedUrl+"/api/delete_scenic",{id:item.productid})
        .then(res => {
             if(res.data.success_code==200)  {     
                that.myjingdain.splice(index,1) 
          }
                             
        })
    },
    // 编辑景点
    compile(item,index) {
        this.compileindex=0
        this.allscenic.title=item.producttitle
        this.allscenic.introduce=item.scenic_introduce
        this.allscenic.way=item.way
        this.allscenic.type=item.type
        this.allscenic.hot=item.hot
        this.allscenic.pirce=item.price
        this.compileImages=item.scenicimg
        this.compileimg[0]=item.Guideimg
        this.scenicid=item.productid
        this.scenicindex=index
        document.getElementById("there").scrollIntoView();
    }
    },

    async mounted() {
          var user= JSON.parse(localStorage.getItem('userinfo'))
          console.log(user)
            var that=this
            await this.$axios.get(this.BasedUrl+"/api/jingdian")
            .then(res => {
                var jingdain=[]
                jingdain=res.data.message
                jingdain.forEach(item => {
                if(item.merchantid==user.userid) {
                    this.myjingdain.push(item)
                }
            });
                console.log( this.myjingdain)
            })
            .catch(err => {
                console.log(err);
            });
    }
}
</script>
<style scoped>
.theborder {
    border: 0.01rem solid bisque;
    margin: 0.5rem;
    padding: 0.2rem;
    overflow: hidden;
}
.title {
    font-size: 0.23rem;
}
.theone {
    font-size: 0.18rem;
    margin-top: 0.15rem;
    width: 100%;
    overflow: hidden;
}
.theone p{
    /* float: left; */
    margin-bottom: 0.2rem;
}
.theone textarea {
    background-color: #f4f3f2; 
    width: 5rem;
    padding: 0.1rem;
}
.theone input {
     background-color: #f4f3f2; 
}
.theone img {
    
    width: 1.2rem;
    height:1.2rem;
    display: block;
    float: left;
    margin-right: 0.1rem;
}
.rizhi_img {
    position: relative;
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
.add {
    height: 0.4rem;
    width: 0.6rem;
    text-align: center;
    line-height: 0.4rem;
    margin-top: 0.1rem;
    background-color: red;
}
.luxian {
    overflow: hidden;
    line-height: 0.3rem;
    display: flex;
}
.yichu {
    height: 0.25rem;
    width: 0.6rem;
    text-align: center;
    line-height: 0.25rem;
    background-color: red;
}
.yuanquan {
    font-size: 0.3rem;
    color: #1ba8df;
    float: left;
    margin-right: 0.1rem;
}
.fabu {
    font-size: 0.2rem;
    width: 0.5rem;
    height: 0.3rem;
    text-align: center;
    line-height: 0.3rem;
    background-color: crimson;
    float: right;
    margin-right: 1.5rem;
}
.thebottom {
    background-color: #f4f3f2;
    padding: 0.5rem 0.2rem;
}
.tureadd {
    font-size: 0.23rem;
    padding: 0.2rem 0.1rem;
}
.thebottom_one {
    background-color: #fff;
    padding:0.2rem;
    overflow: hidden;
    margin-bottom: 0.2rem;
}
.thebottom_one img {
    height: 1.2rem;
    width: 1.2rem;
    display: block;
    float: left;
}
.theright {
    padding-left: 0.2rem;
    font-size: 0.18rem;
    float: left;
}
.theright p {
    margin-top: 0.1rem;
}
.zhuangtai {
    float: right;
}
.zhuangtai p {
    font-size: 0.2rem;
    background-color: red;
    line-height: 0.35rem;
    margin-top: 0.2rem;
    width: 0.6rem;
    text-align: center;
}
</style>