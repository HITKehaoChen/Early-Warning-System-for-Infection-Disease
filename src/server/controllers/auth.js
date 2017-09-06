/**
 * @return {boolean}
 */
const AuthwithJWT = (ctx) => {
  let token = ctx.request.query.token;
  if (token !== undefined) {
    console.log('token: ', token);
    return true;
  } else {
    return false;
  }
};
module.exports = {
  AuthwithJWT
}