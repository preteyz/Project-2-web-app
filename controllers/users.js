const db = require("../models");

const index = (req, res) => {
    db.User.find({}, (err, foundUsers) => {
        if (err) return res.send(err)
        return res.render("users/index", { 
            users : foundUsers, 
            loginUser : req.user
            });
    });
};

const show = (req, res) => {
    db.User.findById(req.params.id)
        .populate("posts")
        .populate("comments")
        .exec((err, foundUser) => {
            if (err) return res.send(err)
            return res.render("users/show", {
                user : foundUser, 
                loginUser : req.user 
            });
        });
};


const newUser = (req, res) => {
    res.render("users/new")
} 

const create = (req, res) => {
    db.User.create(req.body, (err, createdUser) => {
        if (err) return res.send(err)
        return res.redirect("/users")
    })
}

const edit = (req, res) => {
    db.User.findById(req.params.id, (err, foundUser) => {
        if (err) return res.send(err);
        return res.render("users/edit", {
            user : foundUser,
            loginUser : req.user
        })
    }) 
}

const update = (req, res) => {
    db.User.findByIdAndUpdate(
        req.params.id,
        {
            $set: {
                ...req.body,
            }
        },
        { new : true },
        (err, updatedUser) => {
            if (err) return res.send(err);
            return res.redirect(`/users/${updatedUser._id}`)
        }
    )
}

const destroy = (req, res) => {
    db.User.findByIdAndDelete(req.params.id, (err, deletedUser) => {
        if (err) return res.send(err);
        db.Post.deleteMany(
            { user : deletedUser._id }, 
            (err, deletedPosts) => {
                console.log(deletedPosts);
                db.Comment.deleteMany(
                    { user : deletedPosts._id }, 
                    (err, deletedComments) => {
                        console.log(deletedComments);
                        return res.redirect("/users");
                    }
                )
            }
        )
    })
}

const isLoggedIn = (req, res) => {
	if (req.isAuthenticated()) return next();
	res.redirect("/auth/google");
};

module.exports = {
    index,
    show,
    newUser,
    create,
    edit,
    update,
    destroy,
    isLoggedIn
}