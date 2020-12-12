var express = require('express');
var router = express.Router();
const multer = require('multer');
const fs = require('fs')


const Category = require("./../modules/category")
const Feed = require("./../modules/feeds")

var UserController = require('./../controllers/UserController')
var AuthController = require('./../controllers/AuthController')

var middleware = require('./../middleware/auth');

var storage=multer.diskStorage({
    destination:'./static/uploads',
    filename:function(req,file,cb){
      cb(null,file.fieldname+'-'+Date.now()+file.originalname);
    }
  });





router.get('/',function(req,res){
    res.send('yello')
})

router.get('/update/evs/feed',function(req,res){
  Feed.update({ "_id" : "5f9ee559ac2aebc7808a4ed8"
},{$set:{
"thumbnail":"https://exclusivevisuals.studio/uploads/file-1604248845095Screenshot_2020-11-01 Exclusive Visuals ( exclusivevisuals) • Instagram photos and videos.png",
"src":"https://exclusivevisuals.studio/uploads/file-1604248887516Chicago Fashion.mp4"
  }
}).exec(function(err,data) {
    res.send('yello')
  })
})




router.get('/user',middleware.authenticate,UserController.getUser)


router.get('/get-feed',UserController.allFeeds);

router.get('/get-inbox',function(req,res){
  UserController.allInbox(req,res)
});

router.post('/create-feed',middleware.authenticate,UserController.createFeed);



router.post('/login',AuthController.login);

router.post('/register',AuthController.register);


router.post('/category',middleware.authenticate,UserController.createCategory)


router.post('/contact-message',function(req,res){
  UserController.sendMessage(req,res)
})


router.delete('/delete-cat/:id',middleware.authenticate,function(req, res) {
  Category.remove({ _id: req.params.id }).exec(function (err, cat) {
      if (cat) {
          res.status(200).json({
              success: true,
              msg: "User Removed"
          })
      }
  })
}
)



router.delete('/delete-inbox/:id',middleware.authenticate,function(req, res) {
  UserController.removeInbox(req,res)
})

router.delete('/delete-feed/:id',middleware.authenticate,function(req, res,next) {
  unlinkfile(req.params.id).then((err)=>{
    Feed.remove({ _id: req.params.id }).exec(function (err, feed) {
        if (feed) {
            res.status(200).json({
                success: true,
                msg: "Feed Removed"
            })
        }
    })  
  }).catch((err)=>{
  })
})





async function unlinkfile(id) {
      await Feed.findOne({ _id: id }).exec(async function (err, feed) {
          if (feed) {
                  let imgArray=feed.thumbnail.split('/')
                  let vidArray=feed.url.split('/')
                  // let coverArray=feed.url.split('/')
                  let filename=imgArray[imgArray.length-1];   
                  let filename2=vidArray[vidArray.length-1];   
                  try{
                    await fs.unlink(`./static/uploads/${filename}`,function(errr,dataa){
                    console.log('====================================');
                    console.log(err);
                    console.log('====================================');
                       
                    })
                    await fs.unlink(`./static/uploads/${filename2}`,function(err,data){
                      console.log('====================================');
                      console.log(err);
                      console.log('====================================');
                    })
                  }
                  catch(err){
                    console.log('====================================');
                    console.log(err);
                    console.log('====================================');
                  }
          }
  })
}



router.get('/feed-category/:category',UserController.getByCat)



router.get('/category',UserController.getCategory)



var upload=multer({storage:storage,limits:{fileSize:200000000}}).single('file');
router.post('/upload-file',middleware.authenticate,function(req,res,next){
    upload(req,res,function(err){
        if (err) {
          res.status(400).json({
            success:false,
            msg:[{msg:"The maximum upload file size is 5MB"}]
          })
        }else{
          if (req.file.filename==null) {
              res.status(401).json({
                success:false,
                msg:[{msg:"files empty,please select files to upload"}]
              })
        }else{
            res.status(200).json({
                success:true,
                url:`${process.env.URL}/uploads/${req.file.filename}`,
                filename:`${req.file.filename}`
              })
          }
          
        }
      })
})




module.exports = router;
