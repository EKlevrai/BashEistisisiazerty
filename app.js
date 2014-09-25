var express = require('express');
var mime = require('mime');


var app = express();
/* On utilise les cookies, les sessions et les formulaires */
app.use(express.static(__dirname + '/public'));
app.use(express.cookieParser())
.use(express.session({secret: 'todotopsecret'}))
.use(express.bodyParser())

/* S'il n'y a pas de todolist dans la session,
on en crée une vide sous forme d'array avant la suite */
.use(function(req, res, next){
    if (typeof(req.session.toSay) == 'undefined') {
        req.session.toSay = {};
    }
    next();
})

/* On affiche la todolist et le formulaire */

.get('/bashed', function(req, res) { 
    res.render('bash.ejs', {toSay: req.session.toSay});
})

.get('/bashing', function(req, res) { 
    res.render('bashForm.ejs');
})

/* On ajoute un élément à la todolist */
.post('/bashing', function(req, res) {
if(req.body.form_name!='' &&
	req.body.form_insulte!='' &&
	req.body.form_recommended_action!='' &&
	req.body.form_mec_d_accord!='' &&
	req.body.form_proportion!='' &&
	req.body.form_capacity!='' &&
	req.body.form_context!='' &&
	req.body.form_reproche!='' &&
	req.body.form_cause!='' ){
	req.session.toSay['name']=req.body.form_name;
	req.session.toSay['insulte']=req.body.form_insulte;
	req.session.toSay['recommended_action']=req.body.form_recommended_action;
	req.session.toSay['mec_d_accord']=req.body.form_mec_d_accord;
	req.session.toSay['proportion']=req.body.form_proportion;
	req.session.toSay['capacity']=req.body.form_capacity;
	req.session.toSay['context']=req.body.form_context;
	req.session.toSay['reproche']=req.body.form_reproche;
	req.session.toSay['cause']=req.body.form_cause;
	}
	res.redirect('/bashed');
})


/* On redirige vers la todolist si la page demandée n'est pas trouvée */
.use(function(req, res, next){
    res.redirect('/bashing');
})

.listen(6951);