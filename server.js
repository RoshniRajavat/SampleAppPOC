var express = require('express');
var app = express();
var fs = require("fs");

//Middleware function Usage to display current date and time
var requestTime = function (req, res, next) {
    req.requestTime = new Date();
    next();
}

app.use(requestTime);

// Navigation to home page using routing
app.get('/', function (req, res) {
    var responseText = 'Home<br>';
    responseText += `<a href='/detail'> Detail </a>`;
    res.send(responseText);
})

// Navigation to Detail page using routing
app.get('/detail', function (req, res) {
    var responseText = 'Detail Page<br><br>';

    //Showing Current date and time by retrieving it from the request
    responseText += '<div> Detail page Requested at: ' + req.requestTime + '</div><br>';

    //Reading data from a file using callback and displaying it in the browser
    fs.readFile('input.txt', function (err, data) {
        if (err) return console.error(err);
        responseText += `<div>${data.toString()}</div>`;
        console.log(data.toString());

        //Promise
        function asyncFunc() {
            return new Promise((resolve, reject) => {
                setTimeout((err) => {
                    resolve('This is Promise Data');
                    reject('This is Error Data', err);
                }, 100);
            });
        }

        //On receiving promise data
        asyncFunc().then(data => {
            console.log('Result: ' + data);
            responseText += `<div>${data}</div>`;

            //Usage of async await 
            async function main() {
                const x = await asyncFunc();
                console.log('Displaying data Using async await : ' + x);
                responseText += `<div> Displaying data Using async await : ${x}</div>`;

                //res.send
                res.send(responseText);

                //res.end
                res.end();
            }
            main();
        });

    });
});

app.listen(3000);