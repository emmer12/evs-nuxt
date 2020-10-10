let mongoose = require('mongoose');
let Schema=mongoose.Schema;
let feedSchema=new Schema({
  title:{
    type:String,
    required:true
  },
  category:{
      type:String,
      required:true
   },
    thumbnail:{
      type:String,
      required:true
    },
    src:{
      type:String,
      required:true
    },
    slug:{
      type:String,
      required:true
    },
},
{
  timestamps:true
}
);


let Feed=module.exports= mongoose.models.evsfeed || mongoose.model('evsfeed',feedSchema)
