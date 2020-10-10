let mongoose = require('mongoose');
let Schema=mongoose.Schema;

let categorySchema=new Schema({
  name:{
    type:String,
    required:true
  },
},
{
  timestamps:true
}
);


let Category=module.exports= mongoose.models.categorys || mongoose.model('categorys',categorySchema)
