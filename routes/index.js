var express = require("express");
var router = express.Router(); //para utilizar toodo este código en app.js
var passport = require("passport");
var User = require("../models/user");

//display landing page or root route (INDEX)
router.get("/", function(req, res){
    res.render("landing");
});

// ===========
//AUTH ROUTES

//show register form
router.get("/register", function(req, res){
    res.render("register");
});

//handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            return res.render("register", {"error": err.message});
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to Yelpcamp " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

//show login form
router.get("/login", function(req, res){
    res.render("login"); //mensaje de aviso
});

// handling login logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){
});

// logout route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/campgrounds");
});

//Sobre nosotros ;)
router.get("/about", function(req, res){
    res.render("about"); //mensaje de aviso
});



module.exports = router;