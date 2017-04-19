var express = require('express');
var router = express.Router();

var controllers = {};

['makedoc'].forEach(function(item){
    controllers[item] = require('./controller/' + item + '.js');
});


router.get('/pc-cn-bizA/pageA\.*', controllers.makedoc.getPage);

router.get('/mockData/bizA/pageA/getRemoteData.json',controllers.makedoc.getJson);

module.exports = router;