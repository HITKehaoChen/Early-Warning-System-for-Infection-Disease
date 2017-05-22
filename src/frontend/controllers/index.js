/**
 * Created by lty96117 on 5/21/2017.
 */
let fn_index = async (ctx, next) => {
  ctx.response.redirect('/index');
};

let fn_signin = async (ctx, next) => {
  let name = ctx.request.body.name || '';
  let password = ctx.request.body.pwd || '';
  console.log(`[server]: sign in with name: ${name}, password: ${password}`);
  if (name === 'koa@koa.com' && password === '12345') {
    ctx.response.status = 200;
    console.log('[server]: sigin succeeded');
  } else {
    ctx.response.status = 401;
    console.log('[server]: signin failed');
  }
  console.log('[server]: response end...')
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