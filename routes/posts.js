const router = require("express").Router();

const ctrl = require("../controllers");

router.get("/", ctrl.posts.index);
router.get("/:id", ctrl.posts.show);
router.get("/new", ctrl.posts.newPost);
router.post("/", ctrl.posts.create);
router.delete("/:id", ctrl.posts.destroy);


module.exports = router;