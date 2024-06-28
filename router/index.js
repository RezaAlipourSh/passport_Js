const { get, getRegister, getLogin, getProfile, postRegister, postLogin, logOut } = require("../controllers/routesController");
const { redirectIfIsAuth, checkAuthentication } = require("../middlewares/middlewares");

const router = require("express").Router();

function initRoute(passport) {
    router.get("/", get);

    router.get("/register", redirectIfIsAuth, getRegister);

    router.get("/login", redirectIfIsAuth, getLogin);

    router.get("/profile", checkAuthentication, getProfile);

    router.post("/register", redirectIfIsAuth, postRegister);

    router.post("/login", redirectIfIsAuth, passport.authenticate('local', {
        successRedirect: "/profile",
        failureRedirect: "/login",
        failureflash: true
    }), postLogin);

    router.get("/logout", checkAuthentication, logOut);

    return router
}

module.exports = initRoute
