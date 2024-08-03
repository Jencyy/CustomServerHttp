const http = require('http');
const fs = require('fs');

const PORT = 8008;

const server = http.createServer((req, res) => {
    let logEntry = `${Math.floor(Math.random() * 100)} : ${req.url} \n`;

    fs.readFile('index.html', 'utf-8' ,(err, data) => {
        if(!err){
            
            res.setHeader('Content-Type', 'text/html');
            res.statusCode = 200;
            res.end(data);
            fs.appendFile('log.txt', logEntry, (err) => {
                if (!err) {
                    console.log("append succesfully")
                    // if (req.url === '/') {
                    //     console.log('Serving default file');
                    //     res.statusCode = 200;
                    //     res.setHeader('Content-Type', 'text/html');
                    //     res.end('<p>welocme to default</p>');
                    // } else if (req.url === '/about') {
                    //     console.log('Serving About page');
                    //     res.statusCode = 200;
                    //     res.setHeader('Content-Type', 'text/html');
                    //     res.end('<p>Welcome to About</p>');
                    // } else {
                    //     console.log('Page not found');
                    //     res.statusCode = 404;
                    //     res.setHeader('Content-Type', 'text/plain');
                    //     res.end('Path not found');
                    // }
                }else{
                    console.log('Error writing to log file:', err);
                    
                }
            });
        }else{
            console.log('Cannot read index.html file');
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Internal Server Error');
        }
       });
    
});

server.listen(PORT, (err) => {
    if (!err) {
        console.log(`Server running at http://localhost:${PORT}/`);
    } else {
        console.log('Error starting server:', err);
    }
});
