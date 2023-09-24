const router = require('express').Router();
const auth = require('../controllers/auth');

router.post("/adminsignup", auth.signup);
router.post("/adminlogin", auth.login);

module.exports = router;