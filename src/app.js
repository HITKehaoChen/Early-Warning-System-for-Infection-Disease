/**
 * Created by lty96117 on 5/18/2017.
 */
const koa = require('koa');
const render = require('koa-ejs');
const fs = require('fs-extra');
const path = require('path');
const staticCache = require('koa-static-cache');

const app = new koa();

render(app, {
  root: path.join(__dirname, 'page'),
  layout: 'template',
  viewExt: 'html',
  cache: false,
  debug: true
});

//set static filename
app.use(async function (ctx, next) {
  staticCache(path.join(__dirname, 'static'), {
    buffer: false
  });
  await next();
});

app.use(async)