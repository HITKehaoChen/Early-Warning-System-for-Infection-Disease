/**
 * Created by lty96117 on 7/2/2017.
 */
const data = require('../fake_data/data');

const jwt = require('jsonwebtoken');

let fn_warning = async (ctx, next) => {
  let token = ctx.request.query.token;
  console.log('token: ', token);
  if (token !== undefined) {
    let userInfo = jwt.verify(token, 'alarm_test_token');
    console.log('data ', userInfo);

    await ctx.render('warning', {
      "user": {
        "id": userInfo.id,
        "name": userInfo.name,
        "gender": "male",
        "age": 22,
        "email": '12345@gmail.com'
      }
    });
  } else {
    ctx.status = 401;
    ctx.redirect('/');
    // await ctx.render('warning', data.default);


  }
};


let fn_training = async (ctx, next) => {
  await ctx.render('training', data.default);
};
let fn_diagnosis = async (ctx, next) => {
  await ctx.render('diagnosis', data.default);
};
let fn_health = async (ctx, next) => {
  await ctx.render('health', data.default);
};

module.exports = {
  'warning': fn_warning,
  'training': fn_training,
  'diagnosis': fn_diagnosis,
  'health': fn_health,
};