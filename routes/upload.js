const router            = require('express').Router()
const bodyParser        = require('body-parser');
const controller        = require('../controllers/upload');

router.use(bodyParser.json())

router.post('/upload', controller.uploadData)

module.exports = router;
