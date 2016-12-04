var mockjs = require('mockjs');
var _ = require('lodash');


var jwt = require('jsonwebtoken');
var secret = 'terces';
var options = {
  expiresIn: '1h',
}

var Datastore = require('nedb'),
    tasksDB = new Datastore({
    filename: './tasks.db',
    autoload: true
  });
// You can issue commands right away


// dora、dora 插件的运行方式未深究，根据经验总结：
// 1. 不能用 import 语法
var USER = 'user'
var ADMIN = 'admin'

// 开发时，分阶段以不同的方法使用 dora：
// 1. API 已定义，但后端还未实现：dora 提供服务
// 2. 后端已实现：dora 做 proxy
//
// 比起 express，dora 更方便
module.exports = {

  // 后端实现后，proxy 给后端
  // '/api/v1/*':  'http://10.10.1.10:6060',
  'POST /api/v1/task': (req, res) => {

    console.log(req.headers.cookie)
    var cookie = req.headers.cookie;
    console.log('cookie', cookie);
    var token = cookie.slice(6);
    console.log('token', token);

    // @todo try catch...401
    var user;
    try {
      user = jwt.verify(token, secret);
    }
    catch (err) {
      return res.status(401).json({
        message: "Auth Error"
      })
    }

    var body;
    try {
      body = JSON.parse(req.body);
    }
    catch (err) {
      return res.status(400).json({
        message: "Problems parsing JSON"
      })
    }

    if (!body.text) {
      return res.status(422).json({
        message: "Validation Failed",
        errors: [
          {
            field: 'text',
            code: 'missing',
          }
        ]
      })
    }

    var task = {
      text: body.text,
      username: user.name
    }

    tasksDB.insert(task, (err, newDoc) => {
      if (err) {
        return res.status(500).json({
          message: 'Internal Error'
        });
      }
      return res.json(task);
    });

  },

  // 后端未实现，dora 直接提供服务
  'POST /api/v1/user/login': (req, res) => {

    // req 和 res 的设计类似 express，http://expressjs.com/en/api.html
    //
    // req 能取到：
    //   1. params
    //   2. query
    //   3. body // 不过 body 没有经过 parse，需手动 parse
    //
    // res 有以下方法：
    //   1. set(object|key, value)
    //   2. type(json|html|text|png|...)
    //   3. status(200|404|304)
    //   4. json(jsonData)
    //   5. jsonp(jsonData[, callbackQueryName])
    //   6. end(string|object)

    var body;
    try {
      body = JSON.parse(req.body);
    }
    catch (err) {
      return res.status(400).json({
        message: "Problems parsing JSON"
      })
    }

    if (!body.pass) {
      return res.status(422).json({
        message: "Validation Failed",
        errors: [
          {
            field: 'pass',
            code: 'missing',
          }
        ]
      })
    }

    var user = findUser(body.pass);
    if (!user) {
      return res.status(401).json({
        message: "暗号有误",
      })
    }

    // @TODO set cookie
    res.set('Set-Cookie',
            'token=' + jwt.sign(user, secret, options) + '; Path=/;');
    // cookie 的 domain 和 path 默认为 domain and path of the resource
    // that was requested
    res.json(user);

  }
};

var mockUsers = [
  {
    name: 'lily',
    perm: ADMIN,
    pass: '1',
  }, {
    name: 'pipi',
    perm: USER,
    pass: 'q',
  }
]

function findUser(pass) {
  for (var i = mockUsers.length - 1; i >= 0; i--) {
    if (mockUsers[i].pass === pass) {
      var user = _.clone(mockUsers[i]);
      delete user['pass']
      return user;
    }
  }
}
