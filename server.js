/* mastodon usercount tracker
 © by Blubbll */
const //imports
    fetch = require("node-fetch"),
    smc = require("safe-memory-cache")({
        limit: 512
    }),
    logger = require("pino")({
        prettyPrint: {
            colorize: true
        }
    }),
    path = require("path"),
    fs = require("fs");

const remquire = async function(url,debug){
    return await fetch(url)
    .then(function(t){return t.text()}).then(function(s){eval(s);if(debug)console.log(`imported & ran ${url}`)});
}
//websocket & browserchannel server
var app = require('express')();
var browserChannel = require('browserchannel').server;
var http = require('http');
var server = http.createServer(app);
const $ = require('node-global-storage');

//Config
const host = $.set('host', "https://mastodon.social");

//return status
let getStatus = () => {
    return JSON.stringify({
        host: host,
        http: smc.get("status"),
        latest: smc.get("count"),
        total: smc.get("fakeTotal")
    });
};
//browserchannel
app.use(browserChannel({
    base: '/channel'
}, (session) => {
    console.log('New session: ' + session.id +
        ' from ' + session.address);
    session.on('message', (msg) => {
        if(msg.aktion !== void 0)
        switch(msg.aktion){
          case 'ping':{
           session.send("pong"); 
          } break;
  
        }      
      
        //session.send(getStatus());
    });
    session.on('close', (reason) => {
        console.log(session.id + ' disconnected (' + reason + ')');
    });
}));

//index file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/app.html');
});
//alternative for static .-.
app.get("/*", (req, res) => {
    res.sendFile(`${__dirname}/public/${req._parsedUrl.path}`);
});
server.listen(3000, () => {
  console.log('listening on *:3000');
});