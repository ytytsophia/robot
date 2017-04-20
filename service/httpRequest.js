var path = require('path'),
    http = require('http'),
    _ = require('../lib/util.js'),
    Log = require('../lib/log.js'),
    Q = require('q');

var ContentType = {
    'html' : 'text/html',
    'json' : 'application/json'
};

exports.request = function(ajaxUrl,type){
    var options = {
        hostname : 'localhost',
        port : 6060,
        path : ajaxUrl,
        method : 'get',
    };
    var defered = Q.defer();
    var rawData = '';

    var req = http.request(options, function(res){
        var statusCode = res.statusCode,
            contentType = res.headers['content-type'],
            typeReg = new RegExp('^' + ContentType[type]),
            error;

        if(statusCode !== 200){
            error = new Error('Request failed.\n'   + 'StatusCode ：' + statusCode);
        }else if(!typeReg.test(contentType)){
            error = new Error('Invalid content-type.\n Expect' + ContentType[type] + ' ,but get ' + 
                contentType);
        }

        if(error){
            Log.error(error.message);
            res.resume()
            return;
        }

        res.setEncoding('utf-8');
        res.on('data', function(chunk){
            rawData += chunk;
            return;
        });
        res.on('end', function(code){
            try{
                defered.resolve(rawData);
            } catch(e){
                Log.error(e.message);
            }
        });
    });

    req.on('error', function(e){
        Log.error('Error：' + e.message);
    });
    req.end();
    return defered.promise;
}