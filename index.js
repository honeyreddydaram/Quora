//require express
const express = require('express');
const app = express();
//port
const port = 8080;
//path for public and view files
const path = require("path");

//uuid
const { v4: uuidv4 } = require('uuid');
//method-override
const methodOverride = require('method-override');


//middleware for express parsing //this should be above the paths because express will be able to parse it
app.use(express.urlencoded({ extended : true }));
app.use(methodOverride('_method')); // looks for _method in request from client side

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// acts as database
// here we used let coz if we used const keyword it will be harder for us to delete posts later, hence use let keyword
let posts = [ // array
    {
    id: uuidv4(), // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
    username : "apnacollege",
    content : "I love coding!",
},
{
    id: uuidv4(),
    username : "honeydaram",
    content : "I am a Scientist working in Microsoft!",
},
{
    id: uuidv4(),
    username : "harshavardhan",
    content : "I work for Emirates as a Boeing pilot!",
},
];



//route
app.get("/posts", (req, res) => {
    res.render("index.ejs",{posts});
});

//create & new route
app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/posts", (req, res) => {
    //username and content body
    let {username, content} = req.body;
    let id = uuidv4();
    //push to the posts array
    posts.push({id, username,content});
    //redirect to home page from /posts/new
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
   let {id} = req.params;
   console.log(id);
   let post = posts.find((p)=> id === p.id);
   res.render("view.ejs", { post });
   
});
//update
app.patch("/posts/:id", (req, res) => {
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p)=> id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
    let {id} = req.params;
    let post = posts.find((p)=> id === p.id);
    res.render("edit.ejs",{post});
});
//delete

app.delete("/posts/:id", (req, res) =>{
    let {id} = req.params;
    posts = posts.filter((p)=> id !== p.id);
    // posts.pop({id, username,content});
    console.log(posts);
    res.redirect("/posts");
})



//listening port requests 
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});