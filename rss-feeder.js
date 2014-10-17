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

		connection.query( 'SELECT * FROM Bash ORDER BY id DESC LIMIT 15;',function(err2, rows2, fields2) {
			if (err2) throw err2;
			rows2.forEach(function(entry){
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

	var sendRSS = function(req,res){res.send(feed.xml());};
	module.exports.getRSS = function(req,res){return sendRSS(req,res);};
	module.exports.addRSS = function(bash){return updateRSS(bash);};
	module.exports.createRSS = function(){createRSS();};
}());