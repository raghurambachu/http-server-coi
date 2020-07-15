const http = require("http");
const fs = require("fs");

const server = http.createServer(handleRequest);

function handleRequest(req,res){
    const url = req.url;
    if(url === "/"){
        fs.createReadStream("./index.html").pipe(res);
    } else if ( url === "/fundamental-duties"){
        res.setHeader("content-type","text/html");
        fs.createReadStream("./fundamental-duties.html").pipe(res);
    }  else if ( url === "/fundamental-rights"){
        res.setHeader("content-type","text/html");
        fs.createReadStream("./fundamental-rights.html").pipe(res);
    } else if ( (new RegExp(".css")).test(url) ||  (new RegExp(".js")).test(url) ||  (new RegExp(".jpeg")).test(url) || (new RegExp(".png")).test(url) ){
        if((new RegExp(".css")).test(url)){
            res.setHeader("content-type","text/css");
            fs.createReadStream(url.slice(1)).pipe(res);
        } else if ((new RegExp(".jpeg")).test(url)){
            res.setHeader("content-type","image/jpeg");
            fs.createReadStream(url.slice(1)).pipe(res);
        } else if ((new RegExp(".png")).test(url)){
            res.setHeader("content-type","image/png");
            fs.createReadStream(url.slice(1)).pipe(res);
        } else if((new RegExp(".js")).test(url)){
            res.setHeader("content-type","application/javascript");
            fs.createReadStream(url.slice(1)).pipe(res);
        }
    } else {
        res.writeHead(404,{"Content-Type":"text/html"});
        res.write("Something more")
        res.end("<h3>Page not found.</h3>")
    }
}

server.listen(3000,() => console.log("server started at port 3000"));








// else if ( (new RegExp(".css")).test(url) ||  (new RegExp(".js")).test(url) ||  (new RegExp(".jpeg")).test(url) || (new RegExp(".png")).test(url) ){
//     fs.readFile("./index.html",(err,data) => {
//         const links = data.toString().match(/<link.*>/g) || [];
//         const img = data.toString().match(/<img.*>/g) || [];
//         const scripts = data.toString().match(/<script.*>/g) || [];
//         [{links,type:"href"},{img,type:"imgsrc"},{scripts,type:"jssrc"}].forEach(externalRes => {
//             if(externalRes.type === "href" && (new RegExp(".css")).test(url)){
//                 externalRes.links.forEach(link => {
//                     const href = /href=\".+?\"/.exec(link)[0].slice(5).slice(1,-1);
//                     res.setHeader("content-type","text/css")
//                     fs.createReadStream(href).pipe(res);
//                 })
//             } else if (externalRes.type === "imgsrc" && ((new RegExp(".jpeg")).test(url) || (new RegExp(".png")).test(url))){
//                 externalRes.img.forEach(img => {
//                     const src = /src=\".+?\"/.exec(img)[0].slice(4).slice(1,-1);
//                     res.setHeader("content-type",src.includes(".png") ? "image/png" : "image/jpeg");
//                     fs.createReadStream(src).pipe(res);
//                 })
//             }
//         });
//     })
// }