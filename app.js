const http = require('http');

const server = http.createServer((req, res) => {
    res.end('Hello World');
})

const PORT = 3000;

server.listen(PORT);