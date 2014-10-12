var RSS = require('rss');
var mysql = require('mysql');
(function() {
/* lets create an rss feed */
	var feed = new RSS({
			title : "basheisti",
			description : "cute cats, hatred, node and RSS",
			feed_url : "http://bash.faucheisti.eu/rss",
			site_url : "http://bash.faucheisti.eu"	
	});
	var createRSS=function(){
		var Attrs={ bashes: [] };
		var connection = mysql.createConnection({
			host     : global.mysql_host,
			user     : global.mysql_user,
			password : global.mysql_password,
			database : global.mysql_database
		});
		connection.connect();
		connection.query('SELECT * FROM Bash ORDER BY id DESC',function(err, rows, fields) {
			if (err) throw err;
			rows.forEach(function(entry){
				if (typeof entry!= 'undefined'
				&& entry.hasOwnProperty("name") 
				&& entry.hasOwnProperty("insulte") 
				&& entry.hasOwnProperty("recommended_action") 
				&& entry.hasOwnProperty("proportion")
				&& entry.hasOwnProperty("capacity")
				&& entry.hasOwnProperty("context")
				&& entry.hasOwnProperty("reproche")
				&& entry.hasOwnProperty("cause")
				)
					/* loop over data and add to feed */
					feed.item({title : entry.name+' t\'es vraiment ...',
						description : entry.name+' t\'es vraiment '+entry.insulte+' tu ferais mieux de '+entry.recommended_action+' et je suis d\'accord avec '+entry.mec_d_accord+' '+entry.proportion+' de l\'eisti ne t\'aimes pas tu fais trop ton malin... A part '+entry.capacity+' tu sais rien faire d\'autre #'+entry.context+' car excuse moi de '+entry.reproche+' quand '+entry.cause+'.',
						url : 'http://bash.faucheisti.eu/bash?id='+entry.id});
			});
		});
		connection.end();	
	};
	var updateRSS = function(bash){
		feed.item({
			title : bash.name+' t\'es vraiment ...',
			description : bash.name+' t\'es vraiment '+bash.insulte+' tu ferais mieux de '+bash.recommended_action+' et je suis d\'accord avec '+bash.mec_d_accord+' '+bash.proportion+' de l\'eisti ne t\'aimes pas tu fais trop ton malin... A part '+bash.capacity+' tu sais rien faire d\'autre #'+bash.context+' car excuse moi de '+bash.reproche+' quand '+bash.cause+'.',
			url : 'http://bash.faucheisti.eu/bash?id='+bash.id
		});
	};
	var sendRSS = function(req,res){res.send(feed.xml());};
	module.exports.getRSS = function(req,res){return sendRSS(req,res);};
	module.exports.addRSS = function(bash){return updateRSS(bash);};
	module.exports.createRSS = function(){createRSS();};
}());