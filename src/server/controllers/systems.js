/**
 * Created by lty96117 on 7/2/2017.
 */
const data = require('../fake_data/data');

let fn_warning = async (ctx, next) => {
  let token = ctx.request.query;
  console.log(token);
  console.log("token: " , token);
  await ctx.render('warning', data.default);
};
let fn_training = async (ctx, next) => {
  await ctx.render('training', data.default);
};
let fn_diagnosis = async (ctx, next) => {
  await ctx.render('diagnosis', data.default);
};
let fn_health = async (ctx, next) => {
  await ctx.render('health', data.default);
};

module.exports = {
  'warning': fn_warning,
  'training': fn_training,
  'diagnosis': fn_diagnosis,
  'health': fn_health,

}