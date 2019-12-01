const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));

const request = require("request");
const mysql = require("mysql");
const tools = require("./tools.js");

//routes

//root route
app.get("/", async function(req, res){
    var imageURLs = await tools.getRandomImages("", 1);
    res.render("index", {"imageURL":imageURLs});
});//root route

app.get("/search", async function(req, res){
    var keyword = req.query.keyword;
    var imageURLs = await tools.getRandomImages(keyword, 9);
    console.log("imageURLs using Promise: " + imageURLs)
    res.render("results", {"imageURLs":imageURLs});
});//search

app.get("/api/updateFavorites", function(req, res){
    var conn = mysql.createConnection({
        host: "cst336db.space",
        user: "cst336_dbUser032",
        password: "gmtwgm",
        database: "cst336_db032"
    })
    
    var sql = "INSERT INTO favorites (imageURL, keyword) VALUES (?, ?)";
    var sqlParams =[req.query.imageURL, req.query.keyword];
    
    conn.connect( function(err){
        if (err) throw err;
        
        conn.query(sql, sqlParams, function(err, result){
            if (err) throw err;
        });//query
    });//connect
    
    res.send("it works!");
});//updateFavorites

//server listener
app.listen("8080", "127.0.0.1", function(){
    console.log("Express Server is running...")
});