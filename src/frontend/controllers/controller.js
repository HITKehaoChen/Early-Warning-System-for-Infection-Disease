/**
 * Created by lty96117 on 5/21/2017.
 */
const fs = require('fs');

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
    .filter(f => {return f.endsWith('.js')})
    .forEach(f => {
      console.log(`process controller: ${f}...`);
      // import js files
      let mapping = require(__dirname + '/' + dir + '/' + f);
      addMapping(router, mapping);
  })
}

module.exports = dir => {
  let controllers_dir = dir|| '';
  let router = require('koa-router')();
  addControllers(router, controllers_dir);
  return router.routes();
};