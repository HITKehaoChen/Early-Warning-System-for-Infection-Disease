const user = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const getUserInfo = async ctx => {
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
  console.log('post data: ', data);
  const userInfo = await user.getUserByName(data.name);
  console.log('userInfo: ', userInfo);

  if (userInfo !== null) {
    if (userInfo.password !== data.password) {
      ctx.status = 401;
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
        token: token
      };
      // get the data from Sequelize

      const data = {
        "user": {
          "id": userInfo.id,
          "name": userInfo.name,
          "gender": "male",
          "age": 22,
          "email": '12345@gmail.com'

        }
      };
      // test user info
      // await ctx.render('index', data);
    }
  } else {
    ctx.body = {
      success: false,
      info: 'THE USER DOES NOT EXIST!'
    };
    ctx.status = 401;
  }

};

module.exports = {
  getUserInfo, //func to get userInfo
  postUserAuth

};
