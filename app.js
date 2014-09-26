var express = require('express'); 
var mime = require('mime'); 
var cookieParser = require('cookie-parser'); 
var bodyParser = require('body-parser'); 
var session = require('express-session'); 
var app = express(); 

/* On utilise les cookies, les sessions et les formulaires */
 app.use(express.static(__dirname + '/public'));
 app.use(cookieParser())
 .use(bodyParser())
 


/**
           _ 
          /\) _   
     _   / / (/\  
    /\) ( Y)  \ \ 
   / /   ""   (Y )
  ( Y)  _      "" 
   ""  (/\       _  
        \ \     /\)
        (Y )   / / 
         ""   ( Y)

*/



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
	
	res.render('bash.ejs', 
	{toSay: {
		name : req.body.form_name,
		insulte : req.body.form_insulte,
		recommended_action : req.body.form_recommended_action,
		mec_d_accord : req.body.form_mec_d_accord,
		proportion : req.body.form_proportion,
		capacity : req.body.form_capacity,
		context : req.body.form_context,
		reproche : req.body.form_reproche,
		cause : req.body.form_cause
	}
	});
	}
})
/* On redirige vers le bash si la page demandée n'est pas trouvée */ 
.use(function(req, res, next){
    res.redirect('/bashing');
})
.listen(6951);
