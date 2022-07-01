const jwt = require('jsonwebtoken')
const scret = 'zhanmh'

let verifyToken = async function (token) {  
  await jwt.verify(token,scret,(err,data)=>{
    if(err){
      return false
    } else {
      return true
    }
  })
}

module.exports.verifyToken = verifyToken