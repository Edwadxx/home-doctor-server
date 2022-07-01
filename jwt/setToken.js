const jwt = require('jsonwebtoken')
const scret = 'doctor-home';  //自定义秘钥  自定义
let setToken =  function(user,pwd){
    const rule = { //账号密码作为规则
        user,
        pwd
    }
    //expiresIn:过期时间
    let ztoken =  jwt.sign(rule, scret, { expiresIn: 60*60*24 }) 
    return ztoken
}


module.exports.setToken = setToken