const routes = require('./index');
const router = require('koa-router')();
// index router
router.get('/', routes.index);
// account router
router.post('/signin', routes.account.signin);
router.post('/signup', routes.account.signup);
// systems router
router.get('/warning', routes.systems.warning);
router.get('/training', routes.systems.training);
router.get('/diagnosis', routes.systems.diagnosis);
router.get('/health', routes.systems.health);

// 404
//  router.get('/*', routes.notfound.notfound);

module.exports = {
  'router': router.routes()
};