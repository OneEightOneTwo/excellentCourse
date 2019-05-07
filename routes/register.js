var express = require('express');
var router = express.Router();
//引入数据库封装文件
var db = require('../public/javascripts/linkmysql');

/* GET users listing. */
//处理前端发送过来的注册请求，并且响应结果
router.post('/', async (req, res, next)=>{
  let {
    m,
    user,
    psw
  } = req.body;
  if (m == 'exist') {
    let sql = `SELECT * from userlist WHERE username='${user}'`;
    db(sql,(data)=>{
      if (data.length > 0) {
        res.send('0');
      } else {
        res.send('1');
      }
    }) 
  } else if (m == 'reg') {
    let sql=`insert into userlist (username,psw,identity) value ('${user}','${psw}','student')`
    db(sql, (data) => {
      if(data.affectedRows>0){
         res.send('1');
      }else{
        res.send('0')
      } 
     
    });
  } else if (m == 'login') {
    let sql = `SELECT * from userlist WHERE username='${user}' AND psw='${psw}'`;
    db(sql,(data)=>{
      if (data.length > 0) {
        res.send('1');
      } else {
        res.send('0');
      }
    }) 
  }

});

module.exports = router;