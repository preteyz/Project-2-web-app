const router = require("express").Router();

const postsCtrl = require("../controllers");

router.get("/", postsCtrl.posts.index);
router.get("/:id", postsCtrl.posts.show);

module.exports = router;