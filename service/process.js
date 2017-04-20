var path = require('path'),
    Util = require('../lib/util.js'),
    Log = require('../lib/log.js'),
    cheerio = require('cheerio'),
    _ = require('underscore');

var templateInfo = {};
var HttpRequest = require('./httpRequest.js');

function parseHtml(rawhtml){
    
}

exports.makeHtml = function(url){
	var request = HttpRequest.request(url,'html');

    request.then(function(data){
        var $ = cheerio.load(data),
            $template = $('[data-url]');

        if($template.length == 0){
            return data;
        }
        dataUrl = $template.attr('data-url');

        var tpl = _.template($template.html());
        var dataRequest = HttpRequest.request(dataUrl,'json');

        dataRequest.then(function(json){
            var asyncHtml = tpl({data:JSON.parse(json)});
            $('body').append(asyncHtml);
            console.log($.html());
        });

    });
	// var $ = cheerio.load(rawhtml.toString()),
	// 	$template = $('script[data-url]');

	// var ajaxUrl = $template.attr('data-url'),
	// 	template = $template.html();
	// var asyncHtml = _.template(template);
	// $('body').append(asyncHtml);
	// console.log($.html());
}

