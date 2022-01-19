const db = require("../models");


// Index

const index = (req, res) => {
    db.User.find({}, (err, foundUsers) => {
        if (err) return res.send(err)
        return res.render("users/index", { 
            users : foundUsers
            });
    });
};

// Show
const show = (req, res) => {
    db.User.find(req.params.id, (err, foundUser) => {
        if (err) return res.send(err)
        return res.render("users/show", {
            user : foundUser 
        });
    });
};

module.exports = {
    index,
    show
}