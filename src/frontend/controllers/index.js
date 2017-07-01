/**
 * Created by lty96117 on 5/21/2017.
 */
// fake data
const data = {
  "user": {
    "id": 28370,
    "name": "王小明",
    "gender": "male",
    "age": 22,
    "email": "12345@qq.com"
  }
};


let fn_index = async (ctx, next) => {
  await ctx.render('index', data);
  await next();
};

let fn_warning = async (ctx, next) => {
  await ctx.render('warning', data);
  await next();
};
let fn_training = async (ctx, next) => {
  await ctx.render('training', data);
  await next();
};
let fn_diagnosis = async (ctx, next) => {
  await ctx.render('diagnosis', data);
  await next();
};
let fn_health = async (ctx, next) => {
  await ctx.render('health', data);
  await next();
};

module.exports = {
  'GET /': fn_index,
  'GET /warning': fn_warning,
  'GET /training': fn_training,
  'GET /diagnosis': fn_diagnosis,
  'GET /health': fn_health,

};