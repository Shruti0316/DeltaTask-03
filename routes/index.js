const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../database");
const e = require("express");

var name="",que="",ans="",title="";
router.get("/" || "/logout",(req,res) => {
    res.render("login.ejs");
});
router.get("/signup",(req,res) => {
    res.render("signup.ejs");
});
router.get("/home",(req,res) => {
    res.render("home.ejs",{username:this.name});
});
router.get("/polls",(req,res)=>{
    db.query("SELECT * FROM poll",(err,result)=>{
        if(result){
            // console.log("resut:n ",result);
            //console.log("res[o]",result[0].title);
            res.render("vote.ejs",{op: result,r:result});
        }
    })
})
router.post("/signup",async (req,res) => {
    var uname = req.body.username;
    var email = req.body.email;
    var pwd = req.body.password;
    module.exports.user = name;
    //console.log(name,email,pwd);
        try {
            const salt = await bcrypt.genSalt();
            const hashedPwd = await bcrypt.hash(req.body.password,salt);
            //console.log(salt,hashedPwd);
            db.query("Select * from user",(err)=>{
                if(err){
                    db.query("create table user(username varchar(50) not null,email varchar(50) not null,password varchar(50) not null)");
                    //console.log("Table created");
                }
            });
            db.query("INSERT INTO user (username,email,password) values(?,?,?)",[uname,email,hashedPwd],(err)=>{
                if(!err){
                    console.log("data entered successfully");
                    res.redirect("/")
                }
                else if(err){
                    console.log(err);
                }
            })
            
        } catch (error) {
            console.log(error);
        }
})
router.post("/login",async (req,res) => {
    this.name = req.body.username;
    var pwd = req.body.password;
    console.log("body req: ",req.body);
    //console.log(name,pwd);
    if(this.name=="" || pwd==""){
        res.send("Enter Username/Password");
    }
    else{
    db.query("SELECT password FROM user WHERE username=?",[this.name],async (err,result)=>{
        try {
            var ismatch = bcrypt.compare(pwd,result[0].password);
            console.log("ismatch: ",ismatch);
            if(ismatch){
                console.log("logged in");
                res.render("home.ejs",{username: this.name});
            }
        } catch (err) {
            //console.log("login failed");
            res.send("Login Failed");
        }
    })
    }
})
router.post("/make",(req,res) => {
    console.log("req:  ",req.body);
    console.log("username: ",this.name);
    var table = req.body.teamname;
    db.query("CREATE TABLE " +table + "(name varchar(35),role char(30) default 'member')",(err,result) => {
        if(result){
            console.log("crated the table ");
            db.query("INSERT INTO "+table+"(name,role) values(?,?)",[this.name,"admin"],(error,result) => {
                if(result) {
                    console.log("data entry succesful")
                    res.render("home.ejs",{username: this.name}); 
                } else if (error) {
                    console.log(error);
                }
            })
        }
        else{
            console.log(err);
        }      
    })
});
router.post("/inviteusers",(req,res)=>{
    console.log("req: ",req.body.teamname,this.name);
    db.query("SELECT role FROM "+req.body.teamname +" WHERE name=?",[this.name],(error,result)=>{
        console.log("res:  ",result);
        if(result){
            if(result[0].role == "admin"){
                db.query("INSERT INTO "+req.body.teamname+"(name,role) values(?,?)",[req.body.username,"requested"],(err,done) => {
                    if(done){
                        console.log("INVITE SENT");
                        res.render("home.ejs",{username: this.name}); 
                    }
                    else if(err){
                        console.log(err);
                    }
                })
            }
        }
        else{
            console.log("ur not admin cannot invite users");
        }
     })
})
router.post("/makepoll",(req,res) => {
    
    var option = req.body.answers.split(",");
    console.log(option);
    db.query("SELECT id FROM poll where id=(SELECT max(id) from poll)",(err,result) => {
        if(result){
            var id = result[0].id;
            console.log(id);
            var newid= id+1;
            db.query("INSERT INTO poll (id,title,que,ans) values(?,?,?,?)",[newid,req.body.polltitle,req.body.question,req.body.answers],(err,result)=>{
                if(result){
                    console.log("poll created");
                    res.render("home.ejs",{username: this.name});
                }
                else if(err){
                    console.log(err);
                }
            })
        }
        else if(err){
            console.log(err);
        }
    })
    //res.render("voting.ejs",{title: req.body.polltitle,question: req.body.question,answers: option});
})
router.get("/vote/:id",(req,res)=>{
    var id = req.params.id;
    db.query("SELECT * FROM poll where id=?",[id],(error,result) => {
        if(result){
            //console.log("result ",result);            
            res.render("voting.ejs",{title: result[0].title,question: result[0].que,answers: result[0].ans.split(",")});
        }
        else if(err){
            console.log(err);
        }
    })
    //res.render("vote.ejs",{id: req.params.id})
})
module.exports = router;