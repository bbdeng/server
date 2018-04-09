//引入http模块
var http = require("http");
//引入url模块
var url =require("url");
//引入fs模块
var fs=require("fs");
//引入path模块
var path=require("path");

var router=require("./model/router");

//创建一个服务器
var server= http.createServer (function (req ,res) {
    router.statics(req,res,"Carousel-figure");
});
//监视端口
server.listen(8054 );
console.log("服务器开启成功！");
