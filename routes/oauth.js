const router = require("express").Router();
const passport = require("passport");

router.get("/", (req, res) => {
    res.render("indxe", {
        loginUser: req.user
    });
});

// Google OAuth login route
router.get(
    "/auth/google", 
    passport.authenticate("google", { scope : ["profile", "email"] })
);

// Google OAuth callback route
router.get(
    "/oauth2callback",
    passport.authenticate("google", {
        successRedirect: "/posts",
        failureRedirect: "/"
    })
);

// OAuth logout route
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/")
})

module.exports = router;