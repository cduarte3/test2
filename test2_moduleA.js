var students = [];
var gpa = [];
var file = require('fs');
const { resolve } = require('path');

module.exports. init = function (){
    return new Promise(function(resolve, reject)
    {
        file.readFile('students.json',(err,data)=>
        {
            if (err) reject("Failure to read students.json");
            students = JSON.parse(data);
            if(!err){
                resolve();
            }
        })
    });
}

module.exports. getBSD = function (){
    return new Promise(function(resolve, reject){
        let bsd = [];
        if(students.length > 0){
            for(i = 0; i < students.length;i++){
                if(students[i].program == "BSD"){
                   bsd.push(students[i]);
                }
            }
            resolve(bsd);
        }
        else{
            reject("unable to read file");
        }
    })
}

module.exports. allStudents = function (){
    return new Promise(function(resolve, reject){
        if(students.length > 0){
            resolve(students);
        }
        else{
            reject("unable to read file");
        }
    })
}

module.exports. highGPA = function (){
    return new Promise(function(resolve, reject){
        if(students.length > 0){
            var highestGrade = students[0];
            for(i = 0; i < students.length; i++){
                if (highestGrade.gpa < students[i].gpa){
                    highestGrade = students[i];
                }
            }
            resolve(highestGrade);
        }
        else{
            reject("Failed finding the student with the highest GPA");
        }
    })
}