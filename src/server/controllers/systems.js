/**
 * Created by lty96117 on 7/2/2017.
 */
const data = require('../fake_data/data');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { AuthwithJWT } = require('./auth');

let fn_warning = async (ctx, next) => {

  if (AuthwithJWT(ctx)) {
    let token = ctx.request.query.token;
    let user = jwt.verify(token, 'alarm_test_token');
    console.log('data: \n', user);
    const userInfo = await User.getUserByName(user.name);

    await ctx.render('warning', {
      "user": {
        "id": userInfo.id,
        "name": userInfo.name,
        "gender": "male",
        "age": 22,
        "email": userInfo.email
      }
    });
  } else {
    ctx.status = 401;
    await ctx.render('index', data.default);


  }
};


let fn_training = async (ctx, next) => {

  if (AuthwithJWT(ctx)) {
    let token = ctx.request.query.token;
    let user = jwt.verify(token, 'alarm_test_token');
    console.log('data: \n', user);
    const userInfo = await User.getUserByName(user.name);

    await ctx.render('training', {
      "user": {
        "id": userInfo.id,
        "name": userInfo.name,
        "gender": "male",
        "age": 22,
        "email": userInfo.email
      }
    });
  } else {
    ctx.status = 401;
    await ctx.render('index', data.default);
  }
};
let fn_diagnosis = async (ctx, next) => {

  if (AuthwithJWT(ctx)) {
    let token = ctx.request.query.token;
    let user = jwt.verify(token, 'alarm_test_token');
    console.log('data: \n', user);
    const userInfo = await User.getUserByName(user.name);

    await ctx.render('diagnosis', {
      "user": {
        "id": userInfo.id,
        "name": userInfo.name,
        "gender": "male",
        "age": 22,
        "email": userInfo.email
      }
    });
  } else {
    ctx.status = 401;
    await ctx.render('index', data.default);


  }
};
let fn_health = async (ctx, next) => {
  if (AuthwithJWT(ctx)) {
    let token = ctx.request.query.token;
    let user = jwt.verify(token, 'alarm_test_token');
    console.log('data: \n', user);
    const userInfo = await User.getUserByName(user.name);

    await ctx.render('health', {
      "user": {
        "id": userInfo.id,
        "name": userInfo.name,
        "gender": "male",
        "age": 22,
        "email": userInfo.email
      }
    });
  } else {
    ctx.status = 401;
    await ctx.render('index', data.default);


  }
};

module.exports = {
  'warning': fn_warning,
  'training': fn_training,
  'diagnosis': fn_diagnosis,
  'health': fn_health,
};