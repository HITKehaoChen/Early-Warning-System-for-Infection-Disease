/**
 * Created by lty96117 on 5/21/2017.
 */
let fn_index = async (ctx, next) => {
  ctx.response.redirect('/index');
};

let fn_signin = async (ctx, next) => {
  let name = ctx.request.body.name || '';
  let password = ctx.request.body.pwd || '';
  console.log(`signin with name: ${name}, password: ${password}`);
  if (name === 'koa@koa.com' && password === '12345') {
    ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
  } else {
    ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;
  }
};

let fn_signup = async (ctx, next) => {

  let name = ctx.request.body.name || '';
  let password = ctx.request.body.pwd || '';
  let password2 = ctx.request.body.pwd2 || '';
  console.log(`signup with name: ${name}, password: ${password}, password2: ${password2}`);
  ctx.response.redirect('/index');

};
module.exports = {
  'GET /': fn_index,
  'POST /signin': fn_signin,
  'POST /signup': fn_signup
};