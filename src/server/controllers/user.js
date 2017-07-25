const user = require('../models/user');

const getUserInfo = async () => {
  const id = this.params.id;
  const res = await user.getUserById(id);
  this.body = res;
};

module.exports = {
  getUserInfo //func to get userInfo
};
