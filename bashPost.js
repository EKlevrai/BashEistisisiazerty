var mysql = require('mysql');

(function() {
var  postBashForm = function(req, res) {
	console.log("POST /bashing, IP is : "+req.connection.remoteAddress+" ["+new Date().toUTCString() +"]");
	if(req.body.form_name!='' &&
	req.body.form_insulte!='' &&
	req.body.form_recommended_action!='' &&
	req.body.form_mec_d_accord!='' &&
	req.body.form_proportion!='' &&
	req.body.form_capacity!='' &&
	req.body.form_context!='' &&
	req.body.form_reproche!='' &&
	req.body.form_cause!='' ){
	var connection = mysql.createConnection({
		host     : global.mysql_host,
		user     : global.mysql_user,
		password : global.mysql_password,
		database : global.mysql_database
	});
		connection.connect();
		var query_INSERT ="INSERT INTO Bash "
						+"(name, insulte, recommended_action, mec_d_accord, proportion, capacity, context, reproche, cause)"
						+"VALUES (\""+req.body.form_name
						+"\",\""+req.body.form_insulte
						+"\",\""+req.body.form_recommended_action
						+"\",\""+req.body.form_mec_d_accord
						+"\",\""+req.body.form_proportion
						+"\",\""+req.body.form_capacity
						+"\",\""+req.body.form_context+"\",\""
						+req.body.form_reproche+"\",\""
						+req.body.form_cause+"\")";
		connection.query(query_INSERT,function(err, rows, fields) {
		if (err) throw err;
		});
		connection.query('SELECT count(id) AS "bash_generes" FROM Bash;',function(err, rows, fields) {
		if (err) throw err;
		res.redirect('/bash?id='+rows[0].bash_generes);
		});
		connection.end();
	}
};
module.exports.managePost = function(req, res) {return postBashForm(req, res); }
}());
