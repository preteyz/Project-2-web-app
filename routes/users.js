const router = require("express").Router();

const ctrl = require("../controllers");

router.get("/", ctrl.users.index, ctrl.users.isLoggedIn);
router.get("/:id", ctrl.users.show);
router.get("/new", ctrl.users.newUser);
router.get("/:id/edit", ctrl.users.edit);
router.post("/", ctrl.users.create);
router.put("/:id", ctrl.users.update);
router.delete("/:id", ctrl.users.destroy);

module.exports = router;