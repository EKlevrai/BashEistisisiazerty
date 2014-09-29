var express = require('express'); 
var mime = require('mime'); 
var cookieParser = require('cookie-parser'); 
var bodyParser = require('body-parser'); 
var session = require('express-session'); 
var mysql = require('mysql');
var app = express(); 

/**put the host */
var mysql_host='localhost';
/**the user */
var mysql_user='basheisti';
/**put the password */
var mysql_password='bash';
/**the DB*/
var mysql_database='faucheisti_prod_basheisti';
/* On utilise les cookies, les sessions et les formulaires */
 app.use(express.static(__dirname + '/public'));
 app.use(cookieParser())
.use(bodyParser())
.get('/bash', function(req, res){
	var connection = mysql.createConnection({
		host     : mysql_host,
		user     : mysql_user,
		password : mysql_password,
		database : mysql_database
	});
	if(!isNaN(parseInt(req.query.id,10))){
		connection.connect();
		connection.query("SELECT * FROM Bash Where id="+req.query.id+";",function(err, rows, fields) {
			if (err){ throw err;
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
})
.get('/bashing', function(req, res) {
    res.render('bashForm.ejs');
})
/* send de bash */ 
.post('/bashing', function(req, res) { if(req.body.form_name!='' &&
	req.body.form_insulte!='' &&
	req.body.form_recommended_action!='' &&
	req.body.form_mec_d_accord!='' &&
	req.body.form_proportion!='' &&
	req.body.form_capacity!='' &&
	req.body.form_context!='' &&
	req.body.form_reproche!='' &&
	req.body.form_cause!='' ){
		var connection = mysql.createConnection({
			host     : 'localhost',
			user     : 'root',
			password : 'toutouze51',
			database : 'faucheisti_prod_basheisti'
		});
		connection.connect();
		var query_INSERT ="INSERT INTO Bash (name, insulte, recommended_action, mec_d_accord, proportion, capacity, context, reproche, cause)"
						+"VALUES (\""+req.body.form_name+"\",\""+req.body.form_insulte+"\",\""+req.body.form_recommended_action+"\",\""+req.body.form_mec_d_accord+"\",\""+req.body.form_proportion+"\",\""+req.body.form_capacity+"\",\""+req.body.form_context+"\",\""+req.body.form_reproche+"\",\""+req.body.form_cause+"\")";
		connection.query(query_INSERT,function(err, rows, fields) {
		if (err) throw err;
		});
		connection.query('SELECT count(id) AS "bash_generes" FROM Bash;',function(err, rows, fields) {
		if (err) throw err;
		console.log(rows[0].bash_generes);
		res.redirect('/bash?id='+rows[0].bash_generes);
		});
		connection.end();
	}
})
/* On redirige vers le bash si la page demandée n'est pas trouvée */ 
.use(function(req, res, next){
    res.redirect('/bashing');
})
.listen(6951);
