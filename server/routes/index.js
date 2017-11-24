var express = require('express');
var router = express.Router();

var path = require('path');


var angular_path = path.resolve(__dirname, '../../dist')
router.use(express.static(angular_path));

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile(path.join(angular_path, 'index.html'))
});

module.exports = router;