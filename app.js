const koa = require('koa');
const render = require('koa-ejs');
const fs = require('fs-extra');
const path = require('path');
const staticCache = require('koa-static-cache');
const opn = require('opn');
const bodyParser = require('koa-bodyparser');
const router = require('koa-router')();
const app = new koa();

render(app, {
  root: path.join(__dirname, '/src/frontend/view'),
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

// log request URL:
app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  await next();
});


app.use(bodyParser());

router.get('/', async (ctx, next) => {
  ctx.response.redirect('/index');
});

router.post('/signin', async (ctx, next) => {
  let name = ctx.request.body.name || '';
  let password = ctx.request.body.pwd || '';
  console.log(`signin with name: ${name}, password: ${password}`);
  if (name === 'koa@koa.com' && password === '12345') {
    ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
  } else {
    ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;
  }
});

router.post('/signup', async (ctx, next) => {
  let name = ctx.request.body.name || '';
  let password = ctx.request.body.pwd || '';
  let password2 = ctx.request.body.pwd2 || '';
  console.log(`signup with name: ${name}, password: ${password}, password2: ${password2}`);
  ctx.response.redirect('/index');
});

app.use(router.routes());
app.use(async function (ctx, next) {
  await ctx.render(ctx.path);
});

app.listen(3000);
console.log('listened at the port 3000...');
opn('http://localhost:3000');