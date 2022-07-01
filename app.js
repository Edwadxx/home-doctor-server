let express = require("express");
let bodyParser = require("body-parser");
const expressJWT = require("express-jwt");
const { setToken } = require("./jwt/setToken");
const { verifyToken } = require("./jwt/verifyToken");
const { QueryUser,UpdataUserToken } = require("./database/modules/user");
const app = express();
app.use(bodyParser()); // 必须添加  不然req获取不了req.body
app.listen("3001", function () {
  console.log("this is server living");
});

app.use((req, res, next) => {
  // 获取请求头里面的token
  let token = req.headers.authorization;
  if (token) {
    const flag = verifyToken(token);
    if (!flag) {
      res.send({
        status: "fail",
      });
    }
  }
  next();
});
// 捕获错误的全局中间件
app.use(function (err, req, res, next) {
  //token过期
  console.log("err", err);
  if (err.status == 401) {
    res.status(401).send({
      status: "fail",
    });
    return;
  }

  if (err) {
    res.status(500).send({
      status: "fail",
    });
  }
});

app.use(
  expressJWT
    .expressjwt({
      secret: "zhanmh",
      algorithms: ["HS256"], //签名算法（6.0以上版本必须加，否则报错）
    })
    .unless({
      path: ["/user/login"],
    })
);
app.post("/user/login", function (req, res) {
  let { user, password } = req.body;
  QueryUser(user).then((result) => {
    if(result.username ==  user && result.password == password){
      let token = setToken()
      res.status(200).send({
        code: 1,
        msg: "登录成功",
        data:{
          token
        }
      });
    } else {
      res.status(200).send({
        code: 0,
        msg: "输入的账号或者密码错误"
      });
    }
  }).catch(error=>{
    res.status(200).send({
      code:0,
      msg:error
    })
  })
});
