const { connection } = require("../mysql");
const tablesName = "userlist";

// 查询用户信息
let QueryUser = (username) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `select * from ${tablesName} where username = '${username}'`,
      (error, result, fields) => {
        if (error) throw error;
        if (result.length) {
          resolve(result);
        } else {
          reject("该用户还没注册");
        }
      }
    );
  });
};

//
let UpdataUserToken = ({ token, user }) => {
  connection.query(
    `update userlist token = ${token} where username = ${user}`,
    (error, result, fields) => {
      if (error) throw error;
    }
  );
};

module.exports = {
  QueryUser,
  UpdataUserToken,
};
