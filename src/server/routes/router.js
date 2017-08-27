const router = require('koa-router')();
const index = require('../controllers/index');
const account = require('../controllers/account');
const systems = require('../controllers/systems');
const not_found = require('../controllers/not_found');
const auth = require('../controllers/user');

router.get('/', index.index);
// to be deprecated///
router.post('/signin', account.signin);
router.post('/signup', account.signup);
//four systems
router.get('/warning',systems.warning);
router.get('/training', systems.training);
router.get('/diagnosis', systems.diagnosis);
router.get('/health', systems.health);
//auth
router.get('/user/:id', auth.getUserInfo);
router.post('/userSignIn', auth.postUserSignInAuth);
router.post('/userSignUp', auth.postUserSignUpAuth);

router.all('*', not_found.not_found);

module.exports = {
'router': router.routes()
};
