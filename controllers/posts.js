const db = require("../models");
const Post = require("../models/Post");

// Index
const index = (req, res) => {
    db.Post.find({}, (err, foundPosts) => {
        if (err) return res.send(err)
        return res.render("posts/index", {
            posts : foundPosts
        });
    });
};

// Show
function show(req, res) {
    db.findById(req.params.id, function(err, movie) {
        res.render('posts/show', { caption: 'Post Detail', post });
    });
}

// New
const newPost = (req, res) => {
	res.render("posts/new");
};


// Create
const create = (req, res) => {
    console.log(req.body);

    const post = new Post(req.body);
    
    post.save(function(err) {
        // one way to handle errors
        if (err) return res.redirect('/posts/new');
        console.log(post);  
        // for now, redirect right back to new.ejs
        res.redirect('/posts');
    });
};

// Delete
const destroy = (req, res) => {
    console.log(req.params.id);
    Post.findOne({"posts._id":req.params.id}, function(err,user){
        const postDoc = user.post.id(req.params.id);
        postDoc.remove();
        user.save(function(err){
        res.redirect("/posts");
        });
    });
}


module.exports = {
    index,
    show,
    newPost,
    create,
    destroy,


}