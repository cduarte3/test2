var express = require("express");
var app = express();
var moduleA = require("./test2_moduleA.js");
const exphbs = require("express-handlebars");
var HTTP_PORT = process.env.PORT || 8080;
var path = require('path');
var message = {"error-message": null};


app.engine(".hbs", exphbs.engine({
    extname:".hbs" ,
    defaultLayout: "main",
    helpers: {
        navLink: function(url, options){
            return '<li' +
            ((url == app.locals.activeRoute) ? ' class="active" ' : '') +  '><a href=" ' + url + ' ">' + options.fn(this) + '</a></li>';
        },
        equal: function (lvalue, rvalue, options) {
            if (arguments.length < 3)
            throw new Error("Handlebars Helper equal needs 2 parameters");
            if (lvalue != rvalue) {
            return options.inverse(this);
            } else {
            return options.fn(this);
            }
        } 
    }
}));
app.set("view engine", ".hbs");
app.use(function(req,res,next){
    let route = req.baseUrl + req.path;
    app.locals.activeRoute = (route == "/") ? "/" : route.replace(/\/$/, "");
    next();
});

var path = require("path");
const { fstat } = require("fs");
const e = require("express");

function onHttpStart(){
    console.log("Express http server listening on: " + HTTP_PORT);
}

app.get("/", function(req, res){
    res.render("home.hbs");
});

app.get("/BSD", function (req, res){
   // moduleA.getBSD() .then (stu => res.json(stu)) .catch((err) => {res.json(message)});
    moduleA.getBSD() .then(bs => res.render("students",{data: bs})) .catch((err) => {res.render(err)});
});
app.get("/students", function (req, res){
    // moduleA.getBSD() .then (stu => res.json(stu)) .catch((err) => {res.json(message)});
     moduleA.allStudents() .then(stu => res.render("students",{data: stu})) .catch((err) => {res.render(err)});
 });

app.get("/highGPA", function (req, res){
    moduleA.highGPA() .then(grade => res.render("student",{data: grade})) .catch((err) => {res.render(err)});
    
});
app.get("*", (req, res)=>{
    res.send("Page Not Found");
});
moduleA.init()
.then(() => { app.listen(HTTP_PORT, onHttpStart) })
.catch((error)=>{ console.log(error)});