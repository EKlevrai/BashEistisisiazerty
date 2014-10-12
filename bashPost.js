var mysql = require('mysql');

(function() {
var  postBashForm = function(req, res,RSSwag) {
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
	var o=[
		{name : req.body.form_name},
		{insulte : req.body.form_insulte},
		{recommended_action :req.body.form_recommended_action},
		{mec_d_accord : req.body.form_mec_d_accord},
		{proportion : req.body.form_proportion},
		{capacity : req.body.form_capacity},
		{context : req.body.form_context},
		{reproche : req.body.form_reproche},
		{cause : req.body.form_cause}
		]; 
		connection.connect();
		connection.query("SELECT * FROM Bash WHERE ? AND ? AND ? AND ? AND ? AND ? AND ? AND ? AND ?",o,function(err_dv,rows_dv,fields_dv){
			if(err_dv)throw err_dv;
			if(rows_dv.length>0){
				res.redirect('/bash?id='+rows_dv[0].id);
				connection.end();
				}
			else{
				var query_INSERT ="INSERT INTO Bash "
					+"(name, insulte, recommended_action, mec_d_accord, proportion, capacity, context, reproche, cause)"
					+"VALUES ("+mysql.escape(req.body.form_name)
					+","+mysql.escape(req.body.form_insulte)
					+","+mysql.escape(req.body.form_recommended_action)
					+","+mysql.escape(req.body.form_mec_d_accord)
					+","+mysql.escape(req.body.form_proportion)
					+","+mysql.escape(req.body.form_capacity)
					+","+mysql.escape(req.body.form_context)
					+","+mysql.escape(req.body.form_reproche)
					+","+mysql.escape(req.body.form_cause)+")";
				connection.query(query_INSERT)
				.on('error',function(err){ 
				if(err.code=="ER_DATA_TOO_LONG"){
					res.redirect("/bashing");
				}
				else throw err;})
				.on('result',function(result) {
					o['id']=result.insertId;
					RSSwag.addRSS(o);
					res.redirect('/bash?id='+result.insertId);
				});
				connection.end();				
			}
		});
		
	}
};
module.exports.managePost = function(req, res,RSSwag) {return postBashForm(req, res,RSSwag); }
}());
