let mongoose = require('mongoose');
const bcrypt=require("bcryptjs");
const jwt = require('jsonwebtoken');

const Schema=mongoose.Schema
let userSchema=new Schema({
  username:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  confirmed:{
    type:Boolean,
    default:false
  },
  confirmationToken:{
    type:String,
  }
},
{
  timestamps:true
}
);

userSchema.methods.encryptPassword=function encryptPassword(password) {
  return bcrypt.hashSync(password,bcrypt.genSaltSync(5),null)
}

userSchema.methods.encryptPin=function encryptPin(pin) {
  return bcrypt.hashSync(pin,bcrypt.genSaltSync(5),null)
}
userSchema.methods.validPin=function validPin(pin) {
  return bcrypt.compareSync(pin,this.pin)
}

userSchema.methods.validPassword=function validPassword(password) {
  return bcrypt.compareSync(password,this.password)
}
userSchema.methods.setConfirmationToken=function setConfirmationToken() {
  return this.confirmationToken=this.tokenize()
}
userSchema.methods.generateConfirmationUrl=function generateConfirmationUrl() {
  return `${process.env.HOST}/users/confirmation/${this.confirmationToken}`
}

userSchema.methods.generateResetPasswordLink=function generateResetPasswordLink() {
  return `${process.env.HOST}/reset-password/${this.resetPasswordToken()}`
}



userSchema.methods.resetPasswordToken=function resetPasswordToken(){
  const token=jwt.sign(
    {_id:this._id},
   'thisismysecrete',
    {expiresIn:"1h"}
 )
 return token
}

userSchema.methods.tokenize=function tokenize(){
  const token=jwt.sign({
   email:this.email,
 },
 'thisismysecrete',
 {expiresIn:'1y'}
 )
 return token
}


userSchema.methods.pinAuthToken=function pinAuthToken(){
  const token=jwt.sign({
  email:this.email,
 },
 'thisismysecrete',
 {expiresIn:'5m'}
 )
 return token
}

let User=module.exports= mongoose.models.user ||  mongoose.model('user',userSchema)
