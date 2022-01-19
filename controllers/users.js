const db = require("../models");

const index = (req, res) => {
    db.User.find({}, (err, foundUsers) => {
        if (err) return res.send(err)
        return res.render("users/index", { 
            users : foundUsers
            });
    });
};

const show = (req, res) => {
    db.User.find(req.params.id)
        .populate("posts")
        .populate("comments")
        .exec((err, foundUser) => {
            if (err) return res.send(err)
            return res.render("users/show", {
                user : foundUser , loginUser : req.user
            });
        });
};

const create
module.exports = {
    index,
    show
}