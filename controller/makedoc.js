var HttpRequest = require('../service/httpRequest.js');

var Makedoc = module.exports = function(req,res){
   
}

Makedoc.getPage = function(req, res){
    var url = req.url;
    res.send(HttpRequest.send(url,'html'));
}

Makedoc.getJson = function(req,res){
    var url = req.url;
    res.send(HttpRequest.send(url,'json'));
}