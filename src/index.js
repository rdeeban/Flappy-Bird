const http = require('http');
const fs = require('fs');
const path = require('path');
// const reload = require('reload');
// const nocache = require('nocache');

// app.use(nocache());

const server = http.createServer((req, res) => {
    let requestUrl;
    if (req.url === '/') {
        requestUrl = '/index.html';
    }
    else {
        requestUrl = req.url;
    }

    res.setHeader('Cache-Control', 'no-cache');
    fs.readFile(path.join('public/', requestUrl), (err, data) => {
        if (err) {
            res.writeHead(500);
            res.end('Error loading resource from public directory');
        } else {
            res.writeHead(200, {
                'Content-Type': getContentType(requestUrl),
                'Cache-Control': 'no-cache, max-age=0, must-revalidate',
                'Expires': new Date(0).toUTCString(),
                'Pragma': 'no-cache'
            });
            res.end(data);
        }
    });
});

function getContentType(url) {
    const extname = path.extname(url);
    switch (extname) {
        case '.html':
            return 'text/html';
        case '.js':
            return 'text/javascript';
        case '.css':
            return 'text/css';
        case '.json':
            return 'application/json';
        case '.png':
            return 'image/png';
        case '.jpg':
            return 'image/jpg';
        default:
            return 'application/octet-stream';
    }
}

server.listen(3000, () => {
    console.log('Server listening on port 3000');
});