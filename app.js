const koa = require('koa');
const render = require('koa-ejs');
const fs = require('fs-extra');
const path = require('path');
const staticCache = require('koa-static-cache');
const opn = require('opn');
const bodyParser = require('koa-bodyparser');
const router = require('koa-router')();
const controller = require('./src/frontend/controllers/controller');

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

// body parse for post method
app.use(bodyParser());
//add controllers:
app.use(controller());

//render views
app.use(async function (ctx, next) {
  await ctx.render(ctx.path);
});

app.listen(3000);
console.log('listened at the port 3000...');
opn('http://localhost:3000');