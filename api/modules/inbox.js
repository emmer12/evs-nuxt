let mongoose = require('mongoose');
let Schema=mongoose.Schema;
let inboxSchema=new Schema({
  fullname:{
    type:String,
    required:true
  },
  email:{
      type:String,
      required:true
   },
    subject:{
      type:String,
      required:true
    },
  body:{
    type:String,
    required:true
  },
},
{
  timestamps:true
}
);


let Inbox=module.exports= mongoose.models.inbox || mongoose.model('inbox',inboxSchema)
