var express = require("express");
var app = express();
var moduleA = require("./test2_moduleA.js");
var HTTP_PORT = process.env.PORT || 8080;
var path = require('path');
var message = {"error-message": null};
function onHttpStart(){
    console.log("Express http server listening on: " + HTTP_PORT);
}
app.get("/", function(req, res){
    res.send("<h2>Declaration</h2><p>I acknowledge the College's academic integrity policy - and my own integrity - remain in effect whether my work is done remotely or onsite. Any test or assignment is an act of trust between me and my instructor, and especially with my classmates. . . even when no one is watching. I declare I will not break that trust</p><p>Name: <u><mark>Christian Duarte</mark></u></p><p>Student Number: <u><mark>158217208</mark></u></p><p><a href='/BSD'>Click to visit BSD Students</a></p><p><a href='/highGPA'>Click to see who has the highest GPA</a></p>");
});
app.get("/BSD", function (req, res){
    moduleA.getBSD() .then (stu => res.json(stu)) .catch((err) => {res.json(message)});
});
app.get("/highGPA", function (req, res){
    moduleA.highGPA() .then (grade => res.send("<h2>Highest GPA</h2><p>Student ID: " + grade.studId + "</p><p>Name: " + grade.name + "</p>" + "</p><p>Program: " + grade.program + "</p><p>GPA: " + grade.gpa + "</p>")) .catch((err) => {res.json(message)});
    
});
app.get("*", function (req, res){
    res.send("Error 404: page not found.");
    res.statusCode(404);
});

moduleA.init()
.then(() => { app.listen(HTTP_PORT, onHttpStart) })
.catch((error)=>{ console.log(error)});