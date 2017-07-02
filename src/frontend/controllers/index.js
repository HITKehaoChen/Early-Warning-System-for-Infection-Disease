/**
 * Created by lty96117 on 5/21/2017.
 */
// fake data
const deault_data = {
  "user": {
    "id": '00000',
    "name": "未登录",
    "gender": "n/a",
    "age": 'n/a',
    "email": 'n/a'
  }
};


let fn_index = async (ctx, next) => {
  await ctx.render('index', deault_data);
  await next();
};

let fn_warning = async (ctx, next) => {
  await ctx.render('warning', deault_data);
  await next();
};
let fn_training = async (ctx, next) => {
  await ctx.render('training', deault_data);
  await next();
};
let fn_diagnosis = async (ctx, next) => {
  await ctx.render('diagnosis', deault_data);
  await next();
};
let fn_health = async (ctx, next) => {
  await ctx.render('health', deault_data);
  await next();
};

module.exports = {
  'GET /': fn_index,
  'GET /warning': fn_warning,
  'GET /training': fn_training,
  'GET /diagnosis': fn_diagnosis,
  'GET /health': fn_health,

};