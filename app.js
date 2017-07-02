const koa = require('koa');
const render = require('koa-ejs');
const fs = require('fs-extra');
const path = require('path');
const staticCache = require('koa-static-cache');
const opn = require('opn');
const bodyParser = require('koa-bodyparser');
const router = require('./src/frontend/routes/router');
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
// favicon
app.use(favicon(__dirname + '/src/frontend/public/images/favicon.ico'));
// add routes:
app.use(router.router);

const listening_port = 3000;

app.listen(listening_port, () => {
  console.log(`listened at the port ${listening_port}...`);
});
opn(`http://localhost:${listening_port}`);