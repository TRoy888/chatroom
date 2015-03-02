var http = require("http");
var fs = require("fs");
var server = http.createServer(serverHandler);
var user = {};
user.create = function(res){
  var register = fs.createReadStream("./views/html/register.html");
  register.pipe(res);
}
user.store=function(req, res){
  res.write("this is a store method");
  res.end();
}
var pub = {};
pub.access = function(req, res){
  var file = fs.createReadStream("."+req.url);
  // res.write(req.url);
  file.pipe(res);
}

function serverHandler(req, res){
  var pubPat = /\/public\/*/i;
  if (pubPat.test(req.url)){
    pub.access(req,res);
  }
  else{
    switch(req.url){
      case "/user/create":
        if(req.method=="GET")
          user.create(res);
        else
          user.store(req, res);
      break;
      case "/user/{}"
      break;
    }
  }
}
server.listen(8000);
