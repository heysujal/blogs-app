//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const homeStartingContent = "Welcome to Beelogs.";
const aboutContent = "A minimalistic platform to write blogs. Enjoy";
const contactContent = "Contact me at sujalgupta6100@gmail.com";
const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

let posts = [];

app.get("/", (req, res) => {
  res.render("home", { startingContent: homeStartingContent, posts: posts });
});

app.get("/about", (req, res) => {
  res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", (req, res) => {
  res.render("contact", { contactContent: contactContent });
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.post("/compose", (req, res) => {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody,
  };

  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:postName", function (req, res) {
 

  posts.forEach((post) => {
    let requestedTitle = _.lowerCase(req.params.postName);
    let storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", { post: post });

     
    }
  });
});

app.listen(process.env.PORT || 3000, function (){
  console.log("server started");
});
