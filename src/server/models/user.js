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
  console.log('data to be inserted: ', data);
  let user = await User.create(data);
  console.log('added user: ', user);
  return user;

};


const deleteUserByName = async (name) => {
  let user = getUserByName(name);
  console.log('user', user);
  user.destroy();
  console.log('user ', user);
}

module.exports = {
  getUserById,
  getUserByName,
  createUser,
  deleteUserByName
};