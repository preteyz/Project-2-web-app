const db = require("../models")

const index = (req, res) => {
    db.Post.find({}, (err, foundPosts) => {
        if (err) return res.send(err)
        return res.render("posts/index", {
            posts : foundPosts, loginUser : req.user
        });
    });
};

module.exports = {
    index
}