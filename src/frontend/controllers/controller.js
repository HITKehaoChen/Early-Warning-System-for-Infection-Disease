/**
 * Created by lty96117 on 5/21/2017.
 */
const fs = require('fs');
const multer = require('koa-multer');
const upload = multer({dest: 'uploads/'});
function addMapping(router, mapping) {


  for (let url in mapping) {

    if (mapping.hasOwnProperty(url)) {
      // 如果url类似"GET xxx":
      if (url.startsWith('GET ')) {

        let path = url.substring(4);
        router.get(path, mapping[url]);
        console.log(`registered url mapping: GET -> ${path}`);

      } else if (url.startsWith('POST ')) {

        let path = url.substring(5);
        router.post(path, mapping[url]);
        console.log(`registered url mapping: POST -> ${path}`);

      } else if (url.startsWith('PUT ')) {

        let path = url.substring(4);
        router.put(path, mapping[url]);
        console.log(`registered url mapping: PUT -> ${path}`);

      } else if (url.startsWith('DELETE ')) {

        let path = url.substring(7);
        router.del(path, mapping[url]);
        console.log(`registered url mapping: DELETE -> ${path}`);

      } else {
        console.log(`invalide url:  ${url}`);
      }
    }
  }
}

function addControllers(router, dir) {
  //read all js files
  fs.readdirSync(__dirname + '/' + dir)
    .filter(f => {
      return f.endsWith('.js')
    })
    .forEach(f => {
      console.log(`process controller: ${f}...`);
      // import js files
      let mapping = require(__dirname + '/' + dir + '/' + f);
      // console.log('mapping: ' + mapping);
      // console.log('dir: ' + dir);
      addMapping(router, mapping);
    });

//  for multer
  router.post('/test', upload.single('training_file'), async (ctx, next) => {
    let file = ctx.req.file;
    if (typeof file !== 'undefined' && file !== null) {
      console.log('File type: %s', file.mimetype);
      console.log('Original file name: %s', file.originalname);
      console.log('Size of file: %s bytes', file.size);
      console.log('Storage location: %s', file.path);
    } else {
      console.log('No upload file!');
    }
    // not ctx.request !
    let train_cnt = ctx.req.body.training_count || -1;
    let neurons_cnt = ctx.req.body.neurons_count || -1;
    ctx.response.body = '<h1>Hello, koa2!</h1>';
    console.log(ctx.req.body);

    console.log(`training with ${train_cnt} times and ${neurons_cnt} neurons from file...`);

    ctx.response.redirect('/index');
    // ctx.response.redirect('/index');
    console.log('redirecting...');
  });


  // console.log(`registered url mapping: POST -> /train`);
}

module.exports = dir => {
  //current: js_lib\alarm\src\frontend\controllers\ and dir is ''
  let controllers_dir = dir || '';
  let router = require('koa-router')();
  addControllers(router, controllers_dir);
  return router.routes();
};