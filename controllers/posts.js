const db = require("../models")

const index = (req, res) => {
    db.Post.find({}, (err, foundPosts) => {
        if (err) return res.send(err)
        return res.render("posts/index", {
            posts : foundPosts, loginUser : req.user
        });
    });
};

// Show
const show = (req, res) => {
    console.log(req.params.id);
    db.Post.findById(req.params.id)
        .populate("user")
        .populate("comments")
        .populate("tags")
        .exec((err, foundPost) => {
            if (err) return res.send(err)
            console.log(foundPost)
            return res.render("posts/show", { post : foundPost, loginUser: req.user })
        })
};

// New post
const newPost = (req, res) => {
    res.render("posts/new")
} 


// Create
const create = (req, res) => {
    db.Post.create(req.body, (err, createdPost) => {
        if (err) return res.send(err)
        return res.redirect("/posts")
    })
}

// Delete

const destroy = (req, res) => {
    db.Post.findByIdAndDelete(req.params.id, (err, deletedPost) => {
        if (err) return res.send(err);

        return res.redirect("/posts");
    })
};






module.exports = {
    index,
    show,
    destroy,
    newPost,
    create,
    

}