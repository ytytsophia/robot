var express = require('express');
var app = global.Application = express();
var http = require('http');
var server = http.Server(app);

app.set('port', process.env.PORT || 3000);
server.listen(app.get('port'),function(){
    console.log('Express server listening on port ' + app.get('port'));
});

app.use(require('./router'));