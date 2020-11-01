let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/evs',{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false,useCreateIndex:true});

let db=mongoose.connection;
db.once('open',function(){
  console.log('====================================');
  console.log("EVS api connected");
  console.log('====================================');
});
db.on('error',function(err) {
     console.log(err);
});



module.exports=db