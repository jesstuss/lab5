const request = require('request');
const mysql = require("mysql");

module.exports = {
    /**
     * Return random image URLs from an API
     * @param string keyword - search term
     * @param int imageCount - number of random images
     * @return array of image URLs
     */
    getRandomImages_cb: function (keyword, imageCount, callback){
        var requestURL = "https://api.unsplash.com/photos/random?query="+keyword+"&count="+imageCount+"&client_id=21681a77ca15a74f3e09ed07b97b1c588103dd4fa4084561c55d14bae0b082cc&orientation=landscape"
        request(requestURL, function (error, response, body) {
            if (!error) {
                var parsedData = JSON.parse(body);
                var imageURLs = [];
                
                for (let i = 0; i < 9; i++) {
                    imageURLs.push(parsedData[i].urls.regular);
                }
                callback(imageURLs);
            } else {
                console.log("error", error)
            }
        });//request
    },
    
    /**
     * Return random image URLs from an API
     * @param string keyword - search term
     * @param int imageCount - number of random images
     * @return array of image URLs
     */
    getRandomImages: function (keyword, imageCount){
        var requestURL = "https://api.unsplash.com/photos/random?query="+keyword+"&count="+imageCount+"&client_id=21681a77ca15a74f3e09ed07b97b1c588103dd4fa4084561c55d14bae0b082cc&orientation=landscape"
        
        return new Promise( function(resolve, reject) {
            request(requestURL, function (error, response, body) {
                if (!error) {
                    var parsedData = JSON.parse(body);
                    var imageURLs = [];
                    
                    for (let i = 0; i < imageCount; i++) {
                        imageURLs.push(parsedData[i].urls.regular);
                    }
                    resolve(imageURLs);
                } else {
                    console.log("error", error)
                }
            });//request
        });//promise
    },//function
    
    /**
     * Creates database connection
     * @return db connection
     */
    createConnection: function(){
        var conn = mysql.createConnection({
            host: "cst336db.space",
            user: "cst336_dbUser032",
            password: "gmtwgm",
            database: "cst336_db032"
        });
        return conn;
    }
}