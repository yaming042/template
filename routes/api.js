var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
router.get('/test', function(req, res){
    res.send({status:200, data: [1,2,3], message: ''})
})

module.exports = router;
