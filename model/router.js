//引入url模块
var url =require("url");
//引入fs模块
var fs=require("fs");
//引入path模块
var path=require("path");
//获取文件类型的方法
function suffixName(extname) {
    //读取外部文件
    var mimeJson=fs.readFileSync("./mime.json");
    //将读取的json文件转换为js对象
    var mimes=JSON.parse(mimeJson.toString());
    //根据extname返回相应的后缀名
    return mimes[extname]||"text/html";
};

exports.statics=function (req,res,staticpath) {
    var pathname=url.parse(req.url).pathname;
    if (pathname=="/"){
        pathname="/index.html" //默认加载的首页
    }

//获取文件的后缀名
    var extname=path.extname(pathname);
    if (req.url!="/favicon.ico"){  //过滤请求/favicon.ico
        console.log("收到用户的请求！");
        console.log(pathname);
        fs.readFile(staticpath+pathname ,function (err ,data) {
            if (err){
                //没有这个文件则返回404
                console.log(404);
                fs.readFile(staticpath+"/404.html" ,function (error ,data404) {
                    res.writeHead(404 ,{"Content-Type":"text/html; charset=utf-8"});
                    res.write(data404);
                    res.end();
                })

            }else {
                var mime=suffixName(extname);
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
};

