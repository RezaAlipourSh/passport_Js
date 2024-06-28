const { hashSync } = require("bcrypt");
const { userModel } = require("../model/userModel");

class User {

    static get(req, res) {
        res.render("index.ejs", { title: "homePage" })
    }
    static getRegister(req, res) {
        res.render("register.ejs", { title: "register" })
    }
    static getLogin(req, res) {
        res.render("login.ejs", { title: "LoginForm" })
    }
    static getProfile(req, res) {
        const user = req.user
        res.render("profile.ejs", {
            title: "Your Profile", user
        })
    }
    static async postRegister(req, res, next) {
        try {
            const { fullname: fullName, password, username } = req.body;
            const hashPassword = hashSync(password, 10);
            const user = await userModel.findOne({ username: username })
            if (user) {
                req.flash("error", "this user already existed");
                const referrer = req?.header('Referrer') ?? req.headers.referrer
                return res.redirect(referrer ?? "/register")
            }
            // req.flash("success", "register successfully");
            await userModel.create({
                fullName,
                username,
                password: hashPassword
            });


            res.redirect("/login")

        } catch (error) {
            console.log(error)
        }
    }
    static async postLogin(req, res) {
        res.redirect("/profile")
    }
    static logOut(req, res) {
        req.logOut({ keepSessionInfo: false }, (err) => {
            if (err) console.log(err)
        })
        res.redirect("/login")
    }
}


module.exports = User