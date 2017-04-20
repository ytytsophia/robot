var HttpRequest = require('../service/httpRequest.js'),
	Process = require('../service/process.js');
var Makedoc = module.exports = function(req,res){
   
}

Makedoc.getPage = function(req, res){
    var url = req.url;
    res.send(Process.makeHtml(url));
}

// Makedoc.getJson = function(req,res){
//     var url = req.url;
//     res.send(HttpRequest.send(url,'json'));
// }