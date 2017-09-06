const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const getUserInfo = async ctx => {
  const id = ctx.params.id; //id from url request
  const res = await User.getUserById(id);
  console.log('res: ', res);
  console.log('id: ', id);
  if (res)
    ctx.body = res;
  else
    ctx.body = 'id ' + id + ' not existed!';

};

const postUserSignInAuth = async ctx => {
  const data = ctx.request.body;
  console.log('post data: ', data);
  const userInfo = await User.getUserByName(data.name);
  console.log('userInfo: ', userInfo);

  if (userInfo !== null) {
    if (userInfo.password !== data.password) {
      ctx.body = {
        success: false,
        info: 'Incorrect PIN!'
      }

    } else {

      const userToken = {
        name: userInfo.name,
        id: userInfo.id
      };

      console.log("user token ", userInfo);

      const secret = 'alarm_test_token';
      const token = jwt.sign(userToken, secret); //sign the token

      //body for post request
      ctx.body = {
        success: true,
        token: token,
        info: 'success!'
      };

    }
  } else {
    ctx.body = {
      success: false,
      info: 'THE USER DOES NOT EXIST!'
    };
  }

};

const postUserSignUpAuth = async ctx => {

  const data = ctx.request.body;
  console.log('sign up data: ', data);
  let user_data = await User.getUserByName(data.name);
  if (user_data !== null) {
    ctx.body = {
      success: false,
      info: 'The username has existed!'
    };
    console.log('The username has existed!');
    return ctx.body;
  }
  const userInfo = await User.createUser(data);
  if (userInfo !== null) {
    ctx.body = {
      success: true,
      info: '注册成功！'
    }
  } else {
    ctx.body = {
      success: false,
      info: '注册失败!'
    };
  }


};
const forTest = async ctx => {
  const data = ctx.request.body;
  console.log('Received data: ', data);
  ctx.status = 200;
  ctx.body = data;
};

const mentalTest = async (ctx) => {
  const data = ctx.request.body;
  console.log('Received data: ', data);
  let sum = 0;
  for (let val in data) {
    sum += parseInt(data[val]);
  }
  console.log(sum);
  let res = "没有抑郁";
  if (sum >= 31) {
    res = "有严重抑郁症并需要立即治疗!";
  } else if (sum >= 21) {
    res = "有中度抑郁症";
  } else if (sum >= 11) {
    res = "有轻度抑郁症";
  } else if (sum >= 5) res = "偶尔有";
  ctx.body = res;
};

module.exports = {
  getUserInfo, //func to get userInfo
  postUserSignInAuth,
  postUserSignUpAuth,
  forTest,
  mentalTest

};
