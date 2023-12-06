const mongoose = require('mongoose');

mongoose.connect("mongodb://0.0.0.0:27017/wahab", {
  useNewUrlParser: true,
  useUnifiedTopology: true,     
});

const UserSchema = new mongoose.Schema({

    name: String,
    email:String,
    password: String,
  });


  const User = mongoose.model('User', UserSchema);
  
  module.exports=User