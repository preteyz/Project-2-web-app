const express = require("express");
const router = require("express").Router();
const ctrl = require("../controllers");

router.get("/", ctrl.posts.index);
router.get("/new", ctrl.posts.newPost);
router.get("/:id", ctrl.posts.show);
router.post("/", ctrl.posts.create);


module.exports = router;