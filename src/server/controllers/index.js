const data = require('../fake_data/data.js');


const fn_index = async (ctx,next) => {
  await ctx.render('index', data.default);
//no next
};

module.exports = {
  'index': fn_index,

};
