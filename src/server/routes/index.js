const data = require('../fake_data/data.js');

const account = require('./account');
const systems = require('./systems');
const notfound = require('./404');

const fn_index = async (ctx, next) => {
  await ctx.render('index', data.default);
  await next();
};

module.exports = {
  'index': fn_index,
  'account': account,
  'systems': systems,
  'notfound':notfound
};
