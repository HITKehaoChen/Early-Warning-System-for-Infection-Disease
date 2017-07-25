const db = require('../config/db');
const userModel = '../schema/user_info.js'; // path string
const alarmDB = db.alarmDB;
const User = alarmDB.import(userModel);

const getUserById = async (id) => {
  const userInfo = await User.findOne({
    where: {
      id: id
    }
  });
};

module.exports = {
  getUserById
};