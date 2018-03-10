const  express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const router = express.Router();

let User = require('../models/user');

router.get('/login',(req,res)=>{
    res.render('login');
})
//To sign up 
router.post('/signup',(req,res,next)=>{
    
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;

    req.checkBody('name','Name field is required').notEmpty();
    req.checkBody('email','email not valid').isEmail();
    req.checkBody('password','Password is required').notEmpty();

    let errors = req.validationErrors();
    
    if(errors){
        
        res.render('signup',{
            errors:errors,
            name:name,
            email:email,
            password:password
        })
    }else {
        
        let newUser = new User({
            name:name,
            email:email,
            password:password
        });
        console.log(newUser);
    

    User.createNewUser(newUser,(err,callback)=>{
        if(err){throw err;console.log(callback)}
        console.log('created new user');
    });

    //req.flash('success','You are now registered and may log in');
    res.location('/');
    res.redirect('/');


    }
})

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField:'password'
},
        function(username, password, done) {
            console.log(username);
       
            User.getUserByUsername(username,(err,user)=>{
                if(err) throw err;
                if(!user){
                    console.log('Unknown User');
                    return done(null,false,{message:'Unknown User'});
                }
                User.comparePassword(password,user.password,(err,isMatch)=>{
                    if(err) throw err;
                    if(isMatch){
                        console.log('Password Match');
                        return done(null,user);
                    }else{
                        console.log('Invalid Password');
                        return done(null,false,{message:'Invalid Password'});
                    }
                });
        });
        }
))

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
//Sign up page
router.get('/signup',(req,res)=>{
    res.render('signup.jade');  
})
//Authenticate the user


router.post('/login',passport.authenticate('local',{
    successRedirect:'/',successFlash:'You are logged in',failureRedirect:'/users/login',
    failureFlash:'Invalid Username or password'
})
)

router.get('/logout',(req,res)=>{
    req.logout();
    req.flash('success','You have logged out');
    res.redirect('/users/login');
})

module.exports = router;