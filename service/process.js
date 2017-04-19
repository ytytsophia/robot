var path = require('path'),
    _ = require('../lib/util.js'),
    Log = require('../lib/log.js'),
    cheerio = require('cheerio'),
    Template = require('backbone');

var templateInfo = {};
var HttpRequest = require('./httpRequest.js');

function parseHtml(rawhtml){
    
}

exports.makeHtml = function(url){
	var rawhtml = HttpRequest.send(url,'html');
	console.log(rawhtml)
	var $ = cheerio.load(rawhtml.toString()),
		$template = $('script[data-url]');

	var ajaxUrl = $template.attr('data-url'),
		template = $template.html();
	var asyncHtml = Template.template(template);
	console.log(asyncHtml);
	$('body').append(asyncHtml);
	console.log($.html());
	return $.html();
}

