/**
 * Created by lty96117 on 7/2/2017.
 */

let fn_not_found = async (ctx,next) => {
  // await ctx.render('404', data.default);
  ctx.redirect('/');
  ctx.status = 301;
  console.log('301 redirected.....');
};

module.exports = {
  'not_found': fn_not_found
};