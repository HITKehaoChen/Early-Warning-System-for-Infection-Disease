const db = require('../config/db');
const userModel = '../schema/user_info.js'; // a string for path not a module
const alarmDB = db.alarmDB;
const User = alarmDB.import(userModel);

const getUserById = async (id) => {
  const userInfo = await User.findOne({
    where: {
      id: id
    }
  });
  return userInfo;
};
const getUserByName = async (name) => {
  const userInfo = await User.findOne({
    where: {
      name: name
    }
  });

  return userInfo;
};

const createUser = async (data) => {
  await User.create({

  })
}

module.exports = {
  getUserById,
  getUserByName,
  createUser
};