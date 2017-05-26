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
  root: path.join(__dirname, '/src/frontend/views'),
  layout: 'template',
  viewExt: 'ejs',
  cache: false,
  debug: true
});

//set static file
app.use(
  staticCache(path.join(__dirname, '/src/frontend/public'), {
    buffer: false
  })
);

// log all request URLs:
app.use(async (ctx, next) => {
  console.log(`***url request -> process ${ctx.request.method} ${ctx.request.url}...`);
  await next();
});

// body parse for post method
app.use(bodyParser());
//add controllers:
app.use(controller());

//render views with jsons for now
app.use(async (ctx, next) => {
  // get the json according to the ctx.path
  const data = fs.readJsonSync(path.join(__dirname, 'src/frontend/models', ctx.path + '.json'), {throws: false});
  await ctx.render(ctx.path.substring(1), data);
  await next();
});


app.listen(3000);

console.log('listened at the port 3000...');
opn('http://localhost:3000');