"use strict";
var _this = this;
exports.__esModule = true;
var fs = require("fs");
var express = require("express");
var uuidGen = require("uuid/v4");
var app = express();
var id;
var userObj;
fs.stat('./.id', function (err, stat) {
    var id = fs.readFileSync('./.id', 'utf8');
    if (err == null) {
        console.log(id);
        var index = JSON.parse(fs.readFileSync('../src/assets/index.json', 'utf8'));
        var userObj_1 = index[id];
        if (userObj_1) {
            _this.userObj = userObj_1;
            _this.id = id;
        }
        // Exist
    }
    else if (err.code === 'ENOENT') {
        var file = fs.createWriteStream('.id');
        var uuid = uuidGen();
        file.write(uuid);
        file.close();
    }
});
app.get('/getIndex', function (req, res) {
    var index = JSON.parse(fs.readFileSync('../src/assets/index.json', 'utf8'));
    res.send(index);
});
app.listen(4200);
