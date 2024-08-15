const express = require("express");
const app = express();
const users = require("./routes/users.js");
const posts = require("./routes/posts.js");
const session = require("express-session");
const path = require("path");
const flash=require("connect-flash");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
const sessionOptions={ 
  secret: "mysupersecretstring",
  resave:false,
  saveUninitialized:true
};
app.use(session(sessionOptions));
app.use(flash());
app.use((req,res,next)=>{
  res.locals.message=req.flash('success');
  res.locals.error=req.flash('error');
  // console.log(res.locals);
  next();
});
app.get("/register",(req,res)=>{
   let {name="anonymnous"}=req.query;
   req.session.name=name;
   if(name!="anonymnous")req.flash('success','user registered successfully!');
  else req.flash('error','user not registered!');
  res.redirect("/hello");
});
app.get("/hello",(req,res)=>{
  res.render("page.ejs",{name:req.session.name});
});

app.listen(3000, () => {
  console.log("server is listening to port 3000");
});
