var express = require('express');
//调用express模块的router功能
var router = express.Router();

/* GET home page. */
//前端ajax的get请求并且路径为/，则进入该回调函数
//next:如果有next()就执行下一个回调
router.get('/', function(req, res, next) {
  //req客户端的接收信息
  //res服务端的返回信息
  //读取index.jade并且传入数据
  // res.render('index', { title: 'Express' });
  
  //header() cors跨域方法
  // res.append('Access-Control-Allow-Origin','*');
  let data={
    title:'Express'
  }
  res.send(`<div>hello tiutiu ${data.title}</div>`)
});

module.exports = router;
