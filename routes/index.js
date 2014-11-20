var express = require('express');
var router = express.Router();
var path = require('path');
/*var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();*/
/********Multiparty code begins here *******/
var multiparty = require('multiparty')
    , http = require('http')
    , util = require('util');
/********Multiparty code begins here *******/
var fs = require('fs');

var upload_dir = path.join(__dirname, 'uploads');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/*router.post('/upload', multipartMiddleware, function(req, res) {*/
router.post('/upload', middleware, function(req, res) {
    res.status(200).json({ data: req.files });
    
});

function middleware (req, res, next) {
    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {

        // model req.body to expected format
        for (var prop in fields) {
            req.body[prop] = fields[prop][0];
        }
        req.files = files;

        console.log(req.body);

        next();
    });
}

module.exports = router;
