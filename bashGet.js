var mysql = require('mysql');

(function() {
var  getBashById = function(req, res){
	console.log("GET  /bash?id="+req.query.id+", IP is : "+req.connection.remoteAddress+" ["+new Date().toUTCString() +"]");
	var connection = mysql.createConnection({
		host     : global.mysql_host,
		user     : global.mysql_user,
		password : global.mysql_password,
		database : global.mysql_database
	});
	if(!isNaN(Number(req.query.id,10))){
		connection.connect();
		connection.query("SELECT * FROM Bash Where id="+req.query.id+";",function(err, rows, fields) {
			if (err){ //throw err;
				res.redirect('/bashing');}
			if (typeof rows!= 'undefined' 
			&& typeof rows[0]!= 'undefined'
			&& rows[0].hasOwnProperty("name") 
			&& rows[0].hasOwnProperty("insulte") 
			&& rows[0].hasOwnProperty("recommended_action") 
			&& rows[0].hasOwnProperty("proportion")
			&& rows[0].hasOwnProperty("capacity")
			&& rows[0].hasOwnProperty("context")
			&& rows[0].hasOwnProperty("reproche")
			&& rows[0].hasOwnProperty("cause")
			){ 
				res.render('bash.ejs', 
					{toSay: {
						name : rows[0].name,
						insulte : rows[0].insulte,
						recommended_action : rows[0].recommended_action,
						mec_d_accord : rows[0].mec_d_accord,
						proportion : rows[0].proportion,
						capacity : rows[0].capacity,
						context : rows[0].context,
						reproche : rows[0].reproche,
						cause : rows[0].cause
						}
					});
			}
		else res.redirect('/bashing');
		});
		connection.end();
	}
	else res.redirect('/bashing');
};
module.exports.manageGet = function(req, res) {return getBashById(req, res); }
}());
