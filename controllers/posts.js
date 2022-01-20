const db = require("../models");

// Index
const index = (req, res) => {
    db.Post.find({}, (err, foundPosts) => {
        if (err) return res.send(err);
        db.Tag.find({}, (err, foundTags) => {
            if (err) return res.send(err);
            res.render("posts/index", {
                posts : foundPosts,
                tags : foundTags,
                loginUser : req.user
            });
        });
    }
)}

// Show
const show = (req, res) => {
    db.Post.findById(req.params.id)
        .populate("user")
        .populate("comments")
        .populate("tag")
        .exec((err, foundPost) => {
            if (err) return res.send(err)
            console.log(foundPost)
            db.Tag.find({}, (err, foundTags) => {
                if (err) return res.send(err);
                    res.render("posts/show", {
                        post: foundPost,
                        tags: foundTags,
                        loginUser: req.user
                    }
                )
            })
        })
};

// New post
const newPost = (req, res) => {
    db.User.find({}, (err, foundUsers) => {
        if (err) return res.send(err);
        db.Tag.find({}, (err, foundTags) => {
            if (err) return res.send(err);
            res.render("posts/new", {
                users : foundUsers,
                tags : foundTags,
                loginUser : req.user
            })
        })
    })
};

// Create
const create = (req, res) => {
    db.Post.create(req.body, (err, createdPost) => {
        if (err) res.send(err)
        console.log(createdPost, "created post")
        db.User.findById(createdPost.user)
            .exec((err, foundUser) => {
                if (err) return res.send(err)
                console.log(foundUser, "found user")
                foundUser.posts.push(createdPost)
                foundUser.save();
                db.Tag.findById(createdPost.tag)
                .exec((err, foundTag) => {
                    if (err) return res.send(err)
                    console.log(foundTag, "found tag")
                    foundTag.posts.push(createdPost)
                    foundTag.save();
                    res.redirect(`/posts`)
                })
                
            })
    })
}

// Edit
const edit = (req, res) => {
    db.Post.findById(req.params.id, (err, foundPost) => {
        if (err) return res.send(err);
        return res.render("posts/edit", {
            post : foundPost
        })
    })
}

// Delete
const destroy = (req, res) => {
    db.Post.findByIdAndDelete(req.params.id, (err, deletedPost) => {
        console.log(deletedPost);
        if (err) return res.send(err);
        db.User.findById(deletedPost.user, (err, foundUser) => {
            console.log(foundUser, "foundUser");
            foundUser.posts.remove(deletedPost)
            foundUser.save()
            db.Comment.deleteMany({ post : deletedPost._id }, (err, deletedComments) => {
                console.log(deletedComments, "deleted comments")
                if (err) return res.send(err);
                res.redirect("/posts");
            })
        })
    })
}

module.exports = {
    index,
    show,
    newPost,
    create,
    edit,
    destroy,
}