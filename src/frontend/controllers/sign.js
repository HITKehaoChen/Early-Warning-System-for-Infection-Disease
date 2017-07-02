/**
 * Created by lty96117 on 7/1/2017.
 */
const data_success = {
  "user": {
    "id": 28370,
    "name": "王小明",
    "gender": "male",
    "age": 22,
    "email": "12345@qq.com"
  }
};

let fn_signin = async (ctx, next) => {
  let email = ctx.request.body.name || '';
  let password = ctx.request.body.pwd || '';
  console.log(`[server]: sign in with name: ${email}, password: ${password}`);
  if (email === 'koa@koa.com' && password === '12345') {

    await ctx.render('warning', {
      "user": {
        "id": 28370,
        "name": "王小明",
        "gender": "male",
        "age": 22,
        "email": email
      }
    });
    await next();
    console.log('[server]: sigin succeeded');
    ctx.response.status = 200;
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
  ctx.response.status = 200;
  ctx.response.redirect('index');

  console.log('redirecting...');
};

module.exports = {
  'POST /signin': fn_signin,
  'POST /signup': fn_signup,
};