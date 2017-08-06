const routes = require('./index');
const router = require('koa-router')();
const auth = require('../controllers/user');
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
//api
router.get('/user/:id', auth.getUserInfo);
// 404
router.get('*', routes.notfound.notfound);

module.exports = {
  'router': router.routes()
};