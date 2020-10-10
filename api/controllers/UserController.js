const Feed = require("./../modules/feeds")
const Category = require("./../modules/category")
const Inbox = require("./../modules/inbox")



const UserController = {
    getUser,
    getFeed,
    allFeeds,
    allInbox,
    getByCat,
    getCategory,
    createCategory,
    createFeed,
    sendMessage,
    removeInbox
}

function createSlug(text) {
    return text.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
}


function getUser(req,res) {
    let user=req.user;

    res.status(200).json({
        user
    })
 }

 
function allInbox(req,res) {
    Inbox.find({}).sort({createdAt:-1}).exec(function(err,inbox){
        if (inbox) {
           res.status(200).json({
               inbox
           })
        }else{
            res.status(400).json({
                err,
                msg:"Opps,something went wronge please try again later"
            })
        }
    })
 }


 function getFeed(req,res) {  
     Feed.find({}).sort({createdAt:-1}).exec(function(err,feeds){
         if (feeds) {
            res.status(200).json({
                feeds
            })
         }else{
             res.status(400).json({
                 err,
                 msg:"Opps,something went wronge please try again later"
             })
         }
     })
 }
 

 function allFeeds(req,res) {  
    Feed.find({}).exec(function(err,feeds){
        if (feeds) {
           res.status(200).json({
               feeds:filterFeed(feeds)
           })
        }else{
            res.status(400).json({
                err,
                msg:"Opps,something went wronge please try again later"
            })
        }
    })
}


 
 function getCategory(req,res) {  
    Category.find({}).exec(function(err,category){
        if (category) {
           res.status(200).json({
               category
           })
        }else{
            res.status(400).json({
                err,
                msg:"Opps,something went wronge please try again later"
            })
        }
    })
}


function getByCat(req,res) {  
    
    Feed.find({slug:createSlug(req.params.category)}).exec(function(err,category){
        if (category) {
           res.status(200).json({
               category:filterFeed(category),
           })
        }else{
            res.status(400).json({
                err,
                msg:"Opps,something went wronge please try again later"
            })
        }
    })
}


function filterFeed(feeds) {
    let newFeed = {};
    let data=[]
    // feeds.forEach(feed => {
    //     newFeed.title = feed.title
    //     newFeed.category = feed.category
    //     newFeed.src = feed.src
    //     newFeed.thumb = feed.thumbnail
    //     newFeed.createdAt = feed.createdAt
        
    //     data.push(newFeed)
    // });

    for (let index = 0; index < feeds.length; index++) {
        newFeed._id = feeds[index]._id
        newFeed.title = feeds[index].title
        newFeed.category = feeds[index].category
        newFeed.src = feeds[index].src
        newFeed.thumb = feeds[index].thumbnail
        newFeed.createdAt = feeds[index].createdAt
        newFeed.slug = feeds[index].slug

        data.push(newFeed)
        newFeed={}
    }

    // feeds.map(data=>{
    //     feeds.thumb=data.thumbnail
    // })
    return data;
}

  




function createCategory(req,res) {  
    const name = req.body.category;
    let newCat=new Category({
        name
    })

    newCat.save().then(()=>{
        res.status(200).json({})
    })
}




function createFeed(req,res) {  
    const title = req.body.title;
    const category = req.body.category;
    const thumb = req.body.img;
    const url = req.body.vid;
    const slug=createSlug(category)
    let newFeed=new Feed({
        title,
        category,
        slug,
        thumbnail:thumb,
        src:url
    })

    newFeed.save().then(()=>{
        res.status(200).json({})
    }).catch((err)=>{
        res.status(400).json({
            err,
            msg:"opps something went wronge please try again"
        })
    })
}

function sendMessage(req,res) {  
    const fullname = req.body.fullname;
    const subject = req.body.subject;
    const email = req.body.email;
    const body = req.body.body;


    let newMessage=new Inbox({
        fullname,
        subject,
        email,
        body
    })

    newMessage.save().then(()=>{
        res.status(200).json({})
    }).catch((err)=>{
        res.status(400).json({
            err,
            msg:"opps something went wronge please try again"
        })
    })
}

function removeInbox(req,res){
    Inbox.remove({ _id: req.params.id }).exec(function (err, cat) {
        if (cat) {
            res.status(200).json({
                success: true,
                msg: "Inbox Removed"
            })
        }
    })
  }



module.exports = UserController