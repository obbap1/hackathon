const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const http = require('http');
const logger = require('morgan');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const favicon = require('serve-favicon');
const mongo = require('mongodb');
const flash = require('connect-flash');
const expressValidator = require('express-validator');
const port = process.env.PORT || 3000;

let index = require('./routes/index');
let users = require('./routes/users');


const app = express();

//install ............sure
app.set('view engine','jade');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname , 'public')));

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(expressValidator({
    errorFormatter: (param,msg,value)=>{
        let namespace = param.split('.'),
        root = namespace.shift(),
        formParam = root;
    while(namespace.length){
        formParam += '[' + namespace.shift() + ']';
    }
    return {
        param: formParam,
        msg:msg,
        value:value
    };
    }
}))

app.use(flash());

let sess = {
    secret:'secret',
    saveUninitialized: true,
    resave:true,
    cookie:{
        path:"/",
        maxAge: 180000
    }
}
//secure cookies
if(app.get('env') === 'production'){
    app.set('trust proxy', 1);
    sess.cookie.secure = true;
}

app.use(session(sess));

app.use(passport.initialize());
app.use(passport.session());


//app.use(cookieParser('secret'));


app.use('/',index);
app.use('/users',users);


app.use((req,res,next)=>{
    res.locals.messages = require('express-messages')(req,res);
    next();
});






//get the user object if still logged in or not
app.get('*',(req,res,next)=>{
    res.locals.user = req.user || null;
    next();
})
//Error 404
app.use((req,res,next)=>{
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});
//error handler
app.use((err,req,res,next)=>{
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development';
    
    res.status(err.status || 500);
    res.render('error');
});

app.get('/robots.txt', function (req, res) {
    res.type('text/plain');
    res.send("User-agent: *\nDisallow: /");
});

app.listen(port,()=>{
    console.log('Server running on port ' + port);
})

module.exports = app;