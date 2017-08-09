const user = require('../models/user');

const getUserInfo = async (ctx) => {
  const id = ctx.params.id; //id from url request
  const res = await user.getUserById(id);
  console.log('res: ', res);
  console.log('id: ', id);
  if (res)
    ctx.body = res;
  else
    ctx.body = 'id ' + id + ' not existed!';
};

const postUserAuth = async ctx => {
  const data = ctx.request.body;
  const res = await user.getUserByName(data.name);

  if (userInfo !== null) {
    if (userInfo.password !== data.password) {
      ctx.body = {
        success: false,
        info: 'Incorrect PIN!'
      }
    } else {
      const userToken = {
        name: userInfo.user_name,
        id: userInfo.id
      }
      const secrect = 'alarm_test_demo';

      const token = jwt.sign(userToken, secret); //sign the token
      ctx.body = {
        success: true,
        token: token
      }
    }
  } else {
    ctx.body = {
      success: false,
      info: 'THE USER DOES NOT EXIST!'
    }
  }

};

module.exports = {
  getUserInfo, //func to get userInfo
  postUserAuth

};
