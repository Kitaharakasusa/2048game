let express = require('express');

let server = express();

server.get('/game',function (request, response) {
    response.send('Hello, My Love')
    // response.setHeader('Content-Type', 'text/html');
    // response.sendfile('../page/index.html');
});

server.listen(4040);
console.log('启动');