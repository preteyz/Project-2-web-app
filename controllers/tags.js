const db = require("../models");

const index = (req, res) => {
    db.Tag.find({}, (err, foundTags) => {
        if (err) return res.send(err)
        return res.render("hashtags/index", {
            tags : foundTags        
        })
    })
};

const show = (req, res) => {
	db.Tag.findById(req.params.id)
		.populate("posts")
		.exec((err, foundTag) => {
			if (err) return res.send(err);
            db.Tag.find({}, (err, foundTags) => {
                if (err) return res.send(err)
                return res.render("hashtags/show", { 
                    foundtag: foundTag,
                    tags: foundTags,
                    loginUser: req.user
                });
            })
			
		})
};

const newTag = (req, res) => {
    res.render("hashtags/new")
};

const create = (req, res) => {
    db.Tag.create(req.body, (err, createdTag) => {
        if (err) res.send(err)
        res.redirect(`/posts/new`)
    })
}

const edit = (req, res) => {
    db.Tag.findById(req.params.id, (err, foundTag) => {
        if (err) return res.send(err);
        return res.render("hashtags/edit", {
            tag: foundTag
        }) 
    })
}

const update = (req, res) => {
    db.Tag.findByIdAndUpdate(
        req.params.id,
        {
            $set: {
                ...req.body
            },
        },
        { new : true },
        (err, updatedTag) => {
            if (err) return res.send(err);
            return res.redirect(`/tags`);
        }
    )
}

module.exports = {
    index,
    show,
    newTag,
    create,
    update,
    edit,
}