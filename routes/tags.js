const router = require("express").Router();

const ctrl = require("../controllers");

router.get("/", ctrl.tags.index);
router.get("/new", ctrl.tags.newTag);
router.get("/:id", ctrl.tags.show);
router.get("/:id/edit", ctrl.tags.edit)
router.post("/", ctrl.tags.create);
router.put("/:id", ctrl.tags.update);

module.exports = router;

