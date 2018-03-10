const  express = require('express');
const router = express.Router();

router.get('/',ensureAuthenticated,(req,res)=>{
    res.render('index.jade');
})

//The middleware to ensure the user is authenticated before continuing
function ensureAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/users/login');
}

module.exports = router;
