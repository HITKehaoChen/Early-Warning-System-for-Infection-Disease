const User = require('../models/user');
const data = require('../fake_data/data.js');
const {AuthwithJWT} = require('./auth');
const jwt = require('jsonwebtoken');
const fn_index = async (ctx,next) => {
  if (AuthwithJWT(ctx)) {
    let token = ctx.request.query.token;
    let user = jwt.verify(token, 'alarm_test_token');
    console.log('data: \n', user);
    const userInfo = await User.getUserByName(user.name);

    await ctx.render('index', {
      "user": {
        "id": userInfo.id,
        "name": userInfo.name,
        "gender": "male",
        "age": 22,
        "email": userInfo.email
      }
    });
  } else {
    await ctx.render('index', data.default);


  }
//no next
};

module.exports = {
  'index': fn_index,
};
