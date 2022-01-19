const router = require("express").Router();

const ctrl = require("../controllers");

router.get("/posts/", ctrl.comments.index);
router.get("/posts/:id", ctrl.comments.show);
router.post("/posts/:id/edit", ctrl.comments.edit);
router.post("/posts/:id", ctrl.comments.create);
router.put("/posts/:id", ctrl.comments.update);
router.delete("/posts/:id", ctrl.comments.destroy);

module.exports = router;