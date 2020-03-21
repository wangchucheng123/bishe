const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const session= require('express-session')
var bodyParser = require('body-parser')


const app = express();
// 设置最大上传50mb,不然报错413，超负荷
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({limit:'50mb',extended:true}));


app.use(session ({
  secret:'12345',
  resave:false,
  saveUninitialized:true,//是否保存未初始化的会话
  cookie: {maxAge:1000*60*60*24}  //设置有效时间
}))

//设置跨域访问
app.all("*",function(req,res,next){
  if(!req.get("Origin")) return  next();
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.set("Access-Control-Allow-Origin","*");
  //允许的set类型
  res.set("Access-Control-Allow-Headers","X-Requested-With,content-type");
  //跨域允许的请求方式 
  res.set("Access-Control-Allow-Max-Age",3600);
  if ("OPTIONS"===req.method) return res.send(200)
      next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/upload',express.static(path.join(__dirname, 'upload')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
