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
  console.log('sign up data: ',data);
  let user_data = await User.getUserByName(data.name);
  if (user_data !== null) {
    ctx.body = {
      success: false,
      info: 'The username has been signed up!'
    };
    console.log('The username has been signed up!');
    return ;
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
      info: 'Failed!'
    };
  }


};

module.exports = {
  getUserInfo, //func to get userInfo
  postUserSignInAuth,
  postUserSignUpAuth
};
