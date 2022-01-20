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
        .populate("tag")
        .exec((err, foundPost) => {
            if (err) return res.send(err)
            console.log(foundPost)
            return res.render("posts/show", { post : foundPost, loginUser: req.user })
        })
};



module.exports = {
    index
}