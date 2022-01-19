const express = require("express");
const router = require("express").Router();
const postsCtrl = require("../controllers");

router.get("/", postsCtrl.posts.index);
router.get("/new", postsCtrl.posts.newPost);
router.get("/:id", postsCtrl.posts.show);
router.post("/", postsCtrl.posts.create);
router.delete("/:id", postsCtrl.posts.destroy);

module.exports = router;