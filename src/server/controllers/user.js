const user = require('../models/user');

const getUserInfo = async (ctx, next) => {
  const id = ctx.params.id; //id from url request
  const res = await user.getUserById(id);
  console.log('res: ', res);
  console.log('id: ', id);
  if (res)
    ctx.body = res;
  else
    ctx.body = 'not existed!';
  next();
};

module.exports = {
  getUserInfo //func to get userInfo
};
