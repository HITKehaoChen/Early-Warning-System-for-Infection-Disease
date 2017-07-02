/**
 * Created by lty96117 on 7/2/2017.
 */
const data = require('../fake_data/data');

let fn_404 = async (ctx, next) => {
  await ctx.render('404', data.default);
  await next();
};

module.exports = {
  'notfound': fn_404
};