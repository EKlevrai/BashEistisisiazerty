var mysql = require('mysql');

(function() {
var  printHistory =  function(req, res) {
	console.log("GET  /bashistory, IP is : "+req.connection.remoteAddress+" ["+new Date().toUTCString() +"]");
	var Attrs={ bashes: [] };
	var connection = mysql.createConnection({
		host     : global.mysql_host,
		user     : global.mysql_user,
		password : global.mysql_password,
		database : global.mysql_database
	});
	/*On genere la query à partir du nombre de lignes de data (5 ou moins) */
	connection.query('SELECT * FROM Bash ORDER BY id DESC LIMIT 5;',function(err2, rows2, fields2) {
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
			)	Attrs.bashes.push(entry);
		});
		res.render('bashList.ejs',Attrs);
	});
};
var  printSearch =  function(req, res) {
	console.log("GET  /bashsearch?name="+req.body.search_name+", IP is : "+req.connection.remoteAddress+" ["+new Date().toUTCString() +"]");
	var Attrs={ bashes: [] };
	var connection = mysql.createConnection({
		host     : global.mysql_host,
		user     : global.mysql_user,
		password : global.mysql_password,
		database : global.mysql_database
	});
	/*On genere la query à partir du nombre de lignes de data (5 ou moins) */
	connection.query("SELECT * FROM Bash WHERE name = ? ",req.body.search_name,function(err, rows, fields) {
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
			)	Attrs.bashes.push(entry);
		});
		res.render('bashList.ejs',Attrs);
	});
};
var  printRandom =  function(req, res) {
	console.log("GET  /random, IP is : "+req.connection.remoteAddress+" ["+new Date().toUTCString() +"]");
	var Attrs={ bashes: [] };
	var connection = mysql.createConnection({
		host     : global.mysql_host,
		user     : global.mysql_user,
		password : global.mysql_password,
		database : global.mysql_database
	});
	/*On genere la query à partir du nombre de lignes de data (5 ou moins) */
	connection.query('SELECT * FROM Bash;',function(err, rows, fields) {
	if (err) throw err;
	var n=Math.floor(Math.random() * rows.length) + 0;
	console.log(rows[n]);
	res.render('bash.ejs',{toSay : rows[n]});
	});
};
module.exports.getHistory = function(req, res) {return printHistory(req, res); }
module.exports.getRandom = function(req, res) {return printRandom(req, res); }
module.exports.search = function(req, res) {return printSearch(req, res); }
}());
