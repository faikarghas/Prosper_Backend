const router            = require('express').Router()
const bodyParser        = require('body-parser');
const controller        = require('../controllers/contact');

router.use(bodyParser.json())

router.post('/postform', controller.post)


module.exports = router;
