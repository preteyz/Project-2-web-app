const router = require("express").Router();

const ctrl = require("../controllers");

router.get("/posts/:id", ctrl.comments.index);
// router.get("/posts/:id", ctrl.comments.show);
router.get("/posts/:id/comments/:id/edit", ctrl.comments.edit);
router.post("/posts/:id", ctrl.comments.create);
router.put("/posts/:id", ctrl.comments.update);
router.delete("/posts/:id", ctrl.comments.destroy);

module.exports = router;