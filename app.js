const koa = require('koa');
const render = require('koa-ejs');
const fs = require('fs-extra');
const path = require('path');
const staticCache = require('koa-static-cache');
const opn = require('opn');
const bodyParser = require('koa-bodyparser');
const router = require('koa-router')();
const controller = require('./src/frontend/controllers/controller');
const favicon = require('koa-favicon');


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
  const start = new Date();
  await next();
  const end = new Date() - start;
  console.log(`[URL REQUEST] -> process ${ctx.method} ${ctx.url} - ${end}ms...`);
});

// body parse for post method
app.use(bodyParser());

// add controllers:
app.use(controller());


app.use(favicon(__dirname + '/src/frontend/public/images/favicon.ico'));

// render views with jsons for now
app.use(async (ctx, next) => {
  // get the json according to the ctx.path
  const data = fs.readJsonSync(path.join(__dirname, 'src/frontend/models', ctx.path + '.json'), {throws: false});
  await ctx.render(ctx.path.substring(1), data);
  await next();
});

const listening_port = 3000;

app.listen(listening_port, () => {
  console.log(`listened at the port ${listening_port}...`);
});
opn(`http://localhost:${listening_port}`);