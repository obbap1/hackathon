const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//The sign up Schema

let signUpSchema = mongoose.Schema({
  name:{
    type:String,
  },
  email:{
    type:String
  },
  password:{
    type:String,
    bcrypt:true
  }

})


let User = module.exports = mongoose.model('user',signUpSchema);
//connecting to the db
mongoose.connect('mongodb://hackathoncu:hackathoncu@ds143738.mlab.com:43738/hackathoncu');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

module.exports.createNewUser = (newUser,callback)=>{
      //hashing the algorithm
      bcrypt.hash(newUser.password,10,(err,hash)=>{
        if(err) throw err;
        newUser.password = hash;
        newUser.save(callback);
      }) 
}

module.exports.comparePassword = (candidatePassword,hash,callback)=>{
  bcrypt.compare(candidatePassword,hash,(err,isMatch)=>{
      if(err) return callback(err);
      callback(null,isMatch);
  })
}

module.exports.getUserById = (id,callback)=>{
  User.findById(id,callback);
}

module.exports.getUserByUsername = (username,callback)=>{
  let query = {'email':username};
  console.log(query);
  User.findOne(query,callback);
}