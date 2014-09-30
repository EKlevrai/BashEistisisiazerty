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
	connection.query('SELECT count(id) AS "bash_generes" FROM Bash;',function(err, rows, fields) {
	if (err) throw err;
	var QueryString = 'SELECT * FROM Bash WHERE ';
	for(var i=rows[0].bash_generes;i>0 && i>rows[0].bash_generes-5;i--){
		if (i!=rows[0].bash_generes){QueryString+=' OR ';}
		QueryString+=' id='+i;
	}
	QueryString+='  ORDER BY id DESC;';
	connection.query(QueryString,function(err2, rows2, fields2) {
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
	});
};
module.exports.getHistory = function(req, res) {return printHistory(req, res); }
}());
