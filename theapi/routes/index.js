
const express = require('express');
const router = express.Router();
const conn = require('./../db/db');
const svgCaptcha = require('svg-captcha')
const multer = require("multer");
const fs = require("fs");
const path = require('path');
const upload = multer({
  dest: "upload"//上传文件存放路径
});
const singleMidle = upload.single("file");//一次处理一张
const arrMidle = upload.array("file", 9);//一次最多处理9张
const fieldsMidle = upload.fields([
  { name: "fieldSingleFile", maxCount: 1 },
  { name: "fieldArrayFile", maxCount: 4 }
]);//可同时处理多个上传控件的上传
//实际项目中根据自己的情况，使用以上三种用法之一即可！



/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// 轮播图
router.get('/api/homecasual', (req, res) => {
  // 数据库查询语句
  let aqlStr = 'SELECT * FROM lunbotu';
  // 执行语句 query方法
  conn.query(aqlStr, (error, results, fields) => {
    if (error) {
      res.json({ err_code: 0, message: '请求失败' });
    }
    else {
      res.json({ success_code: 200, message: results });
    }
  });
  // mysql.end();//关闭mysql连接                                                                                                                                                                                                                                                                                                                 
});
// 登录
router.post('/api/register', (req, res) => {
  // 获取的参数
  let zhanghao = req.body.account
  let userpwd = req.body.userpwd
  // 数据库查询语句
  let aqlStr = `SELECT * FROM alluser where Phone=${zhanghao}`
  // 执行语句 query方法
  conn.query(aqlStr, (error, results, fields) => {
    if (error) {
      res.json({ err_code: 0, title: '请输入正确的账号', message: null });
    }
    else {
      // 验证账号是否存在
      if (results.length != 0) {
        if (results[0].Userpwd == userpwd) {
          res.json({ success_code: 200, title: '登录成功', message: { userid: results[0].id, username: results[0].Name, userphone: results[0].Phone, userlike: results[0].Userlike, Administrator: results[0].Administrator,userpoint:results[0].portrait} });
        }
        else {
          res.json({ success_code: 120, title: "密码错误", message: null });
        }
      }
      else {
        res.json({ success_code: 100, title: "账号不存在", message: null });
      }
    }
  });
});


// // 图形验证码
// router.get('/api/captcha', (req, res) => {
//   // 数据库查询语句
//   let captcha = svgCaptcha.create({
//     color:f,
//     noise:2,
//     ignoreChars:'Ooli',
//     size:4
//   })
//   console.log(captcha.text)
//   // 转小写
//   req.session.captcha=captcha.text.toLocaleLowerCase();
//   res.type('svg')
//   res.send(captcha.data)                                                                                                                                                                                                                                                                                                         
// });


// 注册
router.post('/api/login', (req, res) => {
  let allxinxi = req.body.account
  // 获取的参数
  let zhanghao = allxinxi.zhanghao
  let userpwd = allxinxi.thepwd
  let thelike = allxinxi.thelike
  let Administrator = allxinxi.Administrator
  let thename = allxinxi.thename
  // 数据库查询语句
  let aqlStr = `INSERT INTO alluser (Name,Phone,Userlike,Administrator,Userpwd) VALUES ("${thename}","${zhanghao}","${thelike}","${Administrator}","${userpwd}")`

  conn.query(aqlStr, (error, results, fields) => {
    if (error) {
      res.json({ err_code: 0, message: '请求失败' });
    }
    else {
      res.json({ success_code: 200, message: "注册成功" });
    }
  });
});



// 美文
router.get('/api/goodarticle', (req, res) => {
  // 数据库查询语句
  let aqlStr1 = 'select articletitle.id,articletitle.articleContent,articletitle.articletitle,articletitle.articleDate,articletitle.articleuser,articletitle.gotime,articletitle.whatplay,articletitle.userid,articletitle.lookman,articletitle.price,articletitle.longtime,articletitle.whogo,articletitle.topimg,(select group_concat(articleimg.url)from articleimg where articleimg.essayId =articletitle.id  group by articleimg.essayId) url from articletitle';
  // 执行语句 query方法
  conn.query(aqlStr1, (error, results, fields) => {
    if (error) {
      res.json({ err_code: 0, message: '请求失败' });
    }
    else {
      let shuju = results
      for (let i = 0; i < shuju.length; i++) {
        shuju[i].url = shuju[i].url.split(",")
      }
      res.json({ success_code: 200, message: shuju });
    }
  });
})

// 美文详情
router.get('/api/worddetails', (req, res) => {
  let theid = req.query.ID
  // 执行语句 query方法
  let aqlStr1 = `select articletitle.id,articletitle.articleContent,articletitle.articletitle,articletitle.articleDate,articletitle.articleuser,articletitle.gotime,articletitle.whatplay,articletitle.userid,articletitle.lookman,articletitle.price,articletitle.longtime,articletitle.whogo,articletitle.topimg,(select group_concat(articleimg.url)from articleimg where articleimg.essayId =articletitle.id group by articleimg.essayId) url from articletitle where id=${theid}`
  // 执行语句 query方法
  conn.query(aqlStr1, (error, results, fields) => {
    if (error) {
      res.json({ err_code: 0, message: '请求失败' });
    }
    else {
      let shuju = results
      if (shuju[0].url != null) {
        shuju[0].url = shuju[0].url.split(",")
      }
      res.json({ success_code: 200, message: shuju[0] });
    }
  });
})


// 评论
router.get('/api/talk', (req, res) => {
  let theid = req.query.ID
  // 数据库查询语句
  let aqlStr1 = `SELECT * FROM articletalk where talkid=${theid}`
  // 执行语句 query方法
  conn.query(aqlStr1, (error, results, fields) => {
    if (error) {
      res.json({ err_code: 0, message: '请求失败' });
    }
    else {
      res.json({ success_code: 200, message: results });
    }
  });
})

// 新增评论
router.post('/api/addtalk', (req, res) => {
  let talkinfo = req.body.talkinfo
  // 获取的参数
  // 数据库查询语句
  let aqlStr
  if (talkinfo.replyname == null) {
    aqlStr = `INSERT INTO articletalk (talkid,talkname,talkcontent,talktime,userid) VALUES ("${talkinfo.talkid}","${talkinfo.talkname}","${talkinfo.talkcontent}","${talkinfo.talktime}","${talkinfo.userid}")`
  }
  else {
    aqlStr = `INSERT INTO articletalk (talkid,talkname,talkcontent,talktime,replyname,userid) VALUES ("${talkinfo.talkid}","${talkinfo.talkname}","${talkinfo.talkcontent}","${talkinfo.talktime}","${talkinfo.replyname}","${talkinfo.userid}")`
  }

  conn.query(aqlStr, (error, results, fields) => {
    if (error) {
      res.json({ err_code: 0, message: '请求失败' });
    }
    else {
      res.json({ success_code: 200, message: "评论成功" });
    }
  });
});

// 删除评论
router.post('/api/deletetalk', (req, res) => {
  let id = req.body.id
  // 获取的参数
  // 数据库查询语句
  let aqlStr = `DELETE FROM articletalk WHERE ID = ${id}`
  conn.query(aqlStr, (error, results, fields) => {
    if (error) {
      res.json({ err_code: 0, message: '请求失败' });
    }
    else {
      res.json({ success_code: 200, message: "删除成功" });
    }
  });
});


// 门票景点
router.get('/api/jingdian', (req, res) => {
  // 数据库查询语句
  let aqlStr = 'SELECT * FROM scenic';
  // 执行语句 query方法
  conn.query(aqlStr, (error, results, fields) => {
    if (error) {
      res.json({ err_code: 0, message: '请求失败' });
    }
    else {
      // var arr = str.split(',,');
      results.forEach(item => {
        item.scenicimg = item.scenicimg.split('&&&&&&')
        item.way = item.way.split('&&')
      });
      res.json({ success_code: 200, message: results });
    }
  });
})

// 门票景点详情
router.get('/api/jingdian_info', (req, res) => {
  let id = req.query.ID
  // 数据库查询语句
  let aqlStr = `SELECT * FROM scenic WHERE productid = ${id}`;
  // 执行语句 query方法
  conn.query(aqlStr, (error, results, fields) => {
    if (error) {
      res.json({ err_code: 0, message: '请求失败' });
    }
    else {
      // var arr = str.split(',,');
      results.forEach(item => {
        item.scenicimg = item.scenicimg.split('&&&&&&')
        item.way = item.way.split('&&')
      });
      res.json({ success_code: 200, message: results });
    }
  });
})

// 门票景点评论
router.get('/api/jingdian_talk', (req, res) => {
  let id = req.query.ID
  // 数据库查询语句
  let aqlStr = `SELECT * FROM scenic_talk WHERE talkid = ${id}`;
  // 执行语句 query方法
  conn.query(aqlStr, (error, results, fields) => {
    if (error) {
      res.json({ err_code: 0, message: '请求失败' });
    }
    else {
      res.json({ success_code: 200, message: results });
    }
  });
})
// 删除景点评论
router.post('/api/jingdiantalk', (req, res) => {
  let id = req.body.id
  // 获取的参数
  // 数据库查询语句
  let aqlStr = `DELETE FROM scenic_talk WHERE id = ${id}`
  conn.query(aqlStr, (error, results, fields) => {
    if (error) {
      res.json({ err_code: 0, message: '请求失败' });
    }
    else {
      res.json({ success_code: 200, message: "删除成功" });
    }
  });
});
// 新增景点评论
router.post('/api/addscenic_talk', (req, res) => {
  let talkinfo = req.body.talkinfo
  // 获取的参数
  let aqlStr
  // 数据库查询语句
  if (talkinfo.replyname == null) {
    aqlStr = `INSERT INTO scenic_talk (talkid,talkname,talkcontent,talktime,userid) VALUES ("${talkinfo.talkid}","${talkinfo.talkname}","${talkinfo.talkcontent}","${talkinfo.talktime}","${talkinfo.userid}")`
  }
  else {
    aqlStr = `INSERT INTO scenic_talk (talkid,talkname,talkcontent,talktime,replyname,userid) VALUES ("${talkinfo.talkid}","${talkinfo.talkname}","${talkinfo.talkcontent}","${talkinfo.talktime}","${talkinfo.replyname}","${talkinfo.userid}")`
  }
  conn.query(aqlStr, (error, results, fields) => {
    if (error) {
      res.json({ err_code: 0, message: '请求失败' });
    }
    else {
      res.json({ success_code: 200, message: "评论成功" });
    }
  });
});


// 旅游动态
router.get('/api/dynamic', (req, res) => {
  let aqlStr = 'SELECT * FROM dynamictalk';
  let aqlStr1 = 'SELECT * FROM dynamic';
  const prom1 = function () {
    return new Promise((resolve, reject) => {
      conn.query(aqlStr, (error, results, fields) => {
        if (error) {
          reject(error);
        }
        else {
          resolve({msg: results })
        }
      });
    })
  }
  const prom2 = function () {
    return new Promise((resolve, reject) => {
      conn.query(aqlStr1, (error, results, fields) => {
        if (error) {
          reject(error);
        }
        else {
          results.forEach(item => {
            item.img = item.img.split('&&&&&')
          });
          resolve({ msg: results })
        }
      });
    })
  }
  async function gen(){
    let data1=await prom1()
    let data2=await prom2()
    data2.msg.forEach(item1 => {
      var talk=[]
      data1.msg.forEach(item2 => {
        if (item2.theid==item1.id) {
          talk.push(item2)
        }
      });
      item1.alltalk=talk
    })
    res.json({ success_code: 200, message: data2.msg});
}
gen()
});

// 删除整条旅游动态
router.post('/api/delete_dynamic', (req, res) => {
  let id = req.body.id
  // 获取的参数
  // 数据库查询语句，删除动态及其相关评论
  let aqlStr =`delete dynamictalk from dynamictalk where dynamictalk.theid = ${id} `
  let aqlStr1 =`delete dynamic from dynamic where dynamic.id=${id}`
  conn.query(aqlStr1, (error, results, fields) => {
    if (error) {
      res.json({ err_code: 0, message: '请求失败' });
    }
    else {
      conn.query(aqlStr, (error, results, fields) => {
        if (error) {
          res.json({ err_code: 0, message: '请求失败' });
        }
        else {
          res.json({ success_code: 200, message: "删除成功" });
        }
      });
    }
  });
});

// 新增发布旅游动态
router.post('/api/add_dynamic', (req, res) => {
  // 获取的参数
  let scenicinfo = req.body.allinfo
  console.log(scenicinfo)

  scenicinfo.img = scenicinfo.imgs.join('&&&&&')
  let aqlStr = `INSERT INTO dynamic (username,thetime,content,img,userpoint,userid) VALUES ("${scenicinfo.username}","${scenicinfo.thetime}","${scenicinfo.talkcontent}","${scenicinfo.img}","${scenicinfo.userpoint}","${scenicinfo.userid}")`
  conn.query(aqlStr, (error, results, fields) => {
    if (error) {
      res.json({ err_code: 0, message: '请求失败' });
    }
    else {
      res.json({ success_code: 200, message: "发布成功" });
    }
  });
});


// 新增旅游动态评论
router.post('/api/dynamic_talk', (req, res) => {
  let talkinfo = req.body.talkinfo
  // 获取的参数
  let aqlStr
  // 数据库查询语句
  if (talkinfo.replyname == null) {
    aqlStr = `INSERT INTO dynamictalk (theid,talkname,talkcontent,talktime,userid) VALUES ("${talkinfo.talkid}","${talkinfo.talkname}","${talkinfo.talkcontent}","${talkinfo.talktime}","${talkinfo.userid}")`
  }
  else {
    aqlStr = `INSERT INTO dynamictalk (theid,talkname,talkcontent,talktime,replyname,userid) VALUES ("${talkinfo.talkid}","${talkinfo.talkname}","${talkinfo.talkcontent}","${talkinfo.talktime}","${talkinfo.replyname}","${talkinfo.userid}")`
  }
  conn.query(aqlStr, (error, results, fields) => {
    if (error) {
      res.json({ err_code: 0, message: '请求失败' });
    }
    else {
      res.json({ success_code: 200, message: "评论成功" });
    }
  });
});

// 删除朋友圈评论
router.post('/api/removetalk', (req, res) => {
  let id = req.body.id
  // 获取的参数
  // 数据库查询语句
  let aqlStr = `DELETE FROM dynamictalk WHERE id = ${id}`
  conn.query(aqlStr, (error, results, fields) => {
    if (error) {
      res.json({ err_code: 0, message: '请求失败' });
    }
    else {
      res.json({ success_code: 200, message: "删除成功" });
    }
  });
});



// 新增发布景点
router.post('/api/add_scenic', (req, res) => {
  // 获取的参数
  let scenicinfo = req.body.allinfo
  // 数组转字符串
  scenicinfo.way = scenicinfo.way.join('&&')
  scenicinfo.Guideimg = scenicinfo.photo[0]
  scenicinfo.productimg = scenicinfo.photo[1]
  // 截取去掉第一个图片，即是去掉攻略帖
  scenicinfo.photo = scenicinfo.photo.slice(1)
  scenicinfo.photo = scenicinfo.photo.join('&&&&&&')
  let aqlStr = `INSERT INTO scenic (producttitle,productimg,price,scenic_introduce,Guideimg,scenicimg,way,merchantid,hot,type) VALUES ("${scenicinfo.title}","${scenicinfo.productimg}","${scenicinfo.pirce}","${scenicinfo.introduce}","${scenicinfo.Guideimg}","${scenicinfo.photo}","${scenicinfo.way}","${scenicinfo.merchantid}","${scenicinfo.hot}","${scenicinfo.type}")`
  conn.query(aqlStr, (error, results, fields) => {
    if (error) {
      res.json({ err_code: 0, message: '请求失败' });
    }
    else {
      res.json({ success_code: 200, message: "发布成功" });
    }
  });
});


// 删除景点
router.post('/api/delete_scenic', (req, res) => {
  let id = req.body.id
  // 获取的参数
  // 数据库查询语句
  let aqlStr = `DELETE FROM scenic WHERE productid = ${id}`
  conn.query(aqlStr, (error, results, fields) => {
    if (error) {
      res.json({ err_code: 0, message: '请求失败' });
    }
    else {
      res.json({ success_code: 200, message: "删除成功" });
    }
  });
});

// 编辑景点
router.post('/api/compile_scenic', (req, res) => {
  let id = req.body.id
  console.log(id)
  let scenicinfo = req.body.allinfo
  console.log(req.body.allinfo)
  // 数组转字符串
  scenicinfo.way = scenicinfo.way.join('&&')
  scenicinfo.Guideimg = scenicinfo.photo[0]
  scenicinfo.productimg = scenicinfo.photo[1]
  // 截取去掉第一个图片，即是去掉攻略帖
  scenicinfo.photo = scenicinfo.photo.slice(1)
  scenicinfo.photo = scenicinfo.photo.join('&&&&&&')
  // 数据库查询语句
  let aqlStr = `UPDATE scenic SET producttitle = "${scenicinfo.title}",productimg = "${scenicinfo.productimg}",price = "${scenicinfo.pirce}",scenic_introduce = "${scenicinfo.introduce}",Guideimg = "${scenicinfo.Guideimg}",scenicimg = "${scenicinfo.photo}",way = "${scenicinfo.way}",hot = "${scenicinfo.hot}",type = "${scenicinfo.type}" where productid=${id}`
  conn.query(aqlStr, (error, results, fields) => {
    if (error) {
      res.json({ err_code: 0, message: '请求失败' });
    }
    else {
      res.json({ success_code: 200, message: "编辑成功" });
    }
  });
});


// 下单
router.post('/api/neworder', (req, res) => {
  // 获取的参数
  let scenicinfo = req.body.orderinfo
  // 数组转字符串
  scenicinfo.img = scenicinfo.img.join('&&&&&')
  let aqlStr = `INSERT INTO order_name (title,contactman,tourguide,menber,gotime,state,img,price,phone,stude_m) VALUES ("${scenicinfo.title}","${scenicinfo.contactman}","${scenicinfo.tourguide}","${scenicinfo.menber}","${scenicinfo.gotime}","${scenicinfo.state}","${scenicinfo.img}","${scenicinfo.price}","${scenicinfo.phone}","${scenicinfo.stude_m}" )`
  conn.query(aqlStr, (error, results, fields) => {
    if (error) {
      res.json({ err_code: 0, message: '请求失败' });
    }
    else {
      res.json({ success_code: 200, message: "下单成功" });
    }
  });
});

// 获取订单
router.get('/api/getorder', (req, res) => {
  let id = req.query.ID
  let aqlStr=""
  if(id==null) {
    aqlStr = `SELECT * FROM order_name `;
  }
  else {
    aqlStr = `SELECT * FROM order_name WHERE id = ${id}`;
  }
  // 执行语句 query方法
  conn.query(aqlStr, (error, results, fields) => {
    if (error) {
      res.json({ err_code: 0, message: '请求失败' });
    }
    else {
      results.forEach(item => {
        item.img = item.img.split('&&&&&')
      });
      res.json({ success_code: 200, message: results });
    }
  });
})


// 确认出行
router.post('/api/Confirm', (req, res) => {
  let id = req.body.id
  let aqlStr = `UPDATE order_name SET state = 1 where id= ${id}`
  conn.query(aqlStr, (error, results, fields) => {
    if (error) {
      res.json({ err_code: 0, message: '请求失败' });
    }
    else {
      res.json({ success_code: 200, message: "编辑成功" });
    }
  });
});



// 图片
router.post('/api/tupian', arrMidle, (req, res) => {
  // let files=req.files
  const BasedUrl = "http://127.0.0.1:3000/"
  const data = []
  for (var i = 0; i < req.files.length; i++) {
    var newName = req.files[i].path + path.parse(req.files[i].originalname).ext;
    // fs.rename(req.files[i].path,newName,function(err){
    //     if (err) {
    //         console.log("rename failure.");
    //     }else{
    //         console.log("rename success.");
    //         console.log(newName)
    //         data.push(newName)
    //     }
    // });
    // 用同步版的rename会先跳过for循环的内容
    fs.renameSync(req.files[i].path, newName);
    const thenewname = (BasedUrl + newName).replace("\\", "//");
    data.push(thenewname)
  }
  res.json({ success_code: 200, message: data });
});

module.exports = router;
