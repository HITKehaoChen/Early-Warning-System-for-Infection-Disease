const data = require('../fake_data/data.js');


const fn_index = async (ctx,next) => {
  await ctx.render('index', data.default);

};

module.exports = {
  'index': fn_index,

};
