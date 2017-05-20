const koa = require('koa');
const render = require('koa-ejs');
const fs = require('fs-extra');
const path = require('path');
const staticCache = require('koa-static-cache');
const opn = require('opn');
const app = new koa();


render(app, {
  root: path.join(__dirname, '/src/frontend/page'),
  layout: 'template',
  viewExt: 'ejs',
  cache: false,
  debug: true
});

//set static file
app.use(
  staticCache(path.join(__dirname, '/src/frontend/static'), {
    buffer: false
  })
);
app.use(async (ctx, next) => {
  if (ctx.request.path === '/') {
    ctx.response.redirect('/index');
  } else {
    await next();
  }
});
app.use(async function (ctx, next) {
  await ctx.render(ctx.path);
});

app.listen(3000);
console.log('listened at the port 3000');
opn('http://localhost:3000');