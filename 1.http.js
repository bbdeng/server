//引入http模块
var http = require("http");
//引入url模块
var url =require("url");
//引入fs模块
var fs=require("fs");
//引入path模块
var path=require("path");
//引入自定义getmime模块
var getmime=require("./Carousel-figure/js/getmime");

//创建一个服务器
var server= http.createServer (function (req ,res) {

    var pathname=url.parse(req.url).pathname;
    if (pathname=="/"){
        pathname="/index.html" //默认加载的首页
    }

    //获取文件的后缀名
    var extname=path.extname(pathname);
    if (req.url!="/favicon.ico"){  //过滤请求/favicon.ico
        console.log("收到用户的请求！");
        console.log(pathname);
        fs.readFile("C:\\Users\\Administrator\\Desktop\\node\\http\\Carousel-figure"+pathname ,function (err ,data) {
            if (err){
                //没有这个文件则返回404
                console.log(404);
                fs.readFile("Carousel-figure/404.html" ,function (error ,data404) {
                    res.writeHead(404 ,{"Content-Type":"text/html; charset=utf-8"});
                    res.write(data404);
                    res.end();
                })

            }else {
                var mime=getmime.suffixName(extname);
                //返回请求文件
                // 发送 HTTP 头部
                // HTTP 状态值: 200 : OK
                //设置 HTTP 头部，状态码是 200，文件类型是 html，字符集是 utf8
                res.writeHead(200 , {"Content-Type" :""+mime+"; charset=utf-8"});
                res.write(data);
                res.end();

            }
        });

        // var result=url.parse(pathname ,true);
        // console.log("aid="+result.query.aid);
        // console.log("cid="+result.query.cid);
    }

});
//监视端口
server.listen(8055 );
console.log("服务器开启成功！");
