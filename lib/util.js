'use strict';

var fs = require('fs'), path = require('path'), util = require('util');
var log = require('./log.js');
var _ = module.exports;

_.exists = fs.existsSync || path.existsSync;

_.read = function(file, encoding){
    if(!_.exists(file)){
        log.warn(util.format('unable to read file[%s]: No such file or directory.', file));
        return false;
    }

    if(!encoding){
        encoding = 'utf8';
    }

    var content = false;

    try{
        content = fs.readFileSync(file, encoding);
    }catch(e){
        log.error(e);
    }

    return content;
};

_.write = function(file, data, append, options){
    if(!_.exists(file)){
        _.mkdir(path.dirname(file));
    }

    try{
        if(append){
            fs.appendFileSync(file, data, options);
        }else{
            fs.writeFileSync(file, data, options);
        }
    }catch(e){
        log.error(e);
    }
};