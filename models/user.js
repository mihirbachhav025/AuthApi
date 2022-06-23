const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

//create schema
const userSchema  = new Schema({
  email:{
    type : String,
    required:true,
    unique:true,
    lowercase:true,
  },
  password:{
    type : String,
    required:true
  }
});

userSchema.pre('save',async function(next){
   try {
    //Genrate a salt
    const salt = await bcrypt.genSalt(10);
    //passwordhash = salt + hashword
    const passwordHash  = await bcrypt.hash(this.password,salt);
    console.log('salt',salt,'hashedpaswword',passwordHash);
    this.password = passwordHash;
    next();
   } catch (error) {
    next(error);
   }
});

userSchema.methods.isValidPassword = async function(newPassword){
  try {
    return await  bcrypt.compare(newPassword,this.password);
  } catch (error) {
    throw new Error(error);
  }
};

//create model
const User = mongoose.model('user',userSchema);
//export model
module.exports = User;
