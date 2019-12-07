const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.get('/', (req, res) => {
    console.log('The root path was called')
    res.send('Hello Express!');
});
app.listen(8000, () => {
    console.log('Express server is listening on port 8000!');
});
app.get('/burgers', (req, res) => {
    res.send('We have juicy vegan burgers!');
})
app.get('/pizza', (req, res) => {
    res.send('vegan pizza ova hereeeeee');
})
app.get('/pizza/pineapple', (req, res) => {
    res.send('pineapple on pizza???');
})
app.get('/echo', (req, res) => {
    const responseText = `Here are some details of your request
    Base URL: ${req.baseUrl}
    Host: ${req.hostname}
    Path: ${req.path}
    `;
    res.send(responseText);
});
app.get('/queryViewer', (req, res) => {
    console.log(req.query);
    res.end(); //do not send any data back to the client
});
app.get('/greetings', (req, res) => {
    //get values from the request
    const name = req.query.name;
    const race = req.query.race;
    //validate the values
    if (!name) {
        return res.status(400).send('Please provide a name');
    }
    if (!race) {
        return res.status(400).send('Please provide a race');
    }
    //if values are valid, process the request and send response
    const greeting = `Greetings ${name} the ${race}, welcome to our kingdom.`;
    res.send(greeting);
});
app.get('/hello', (req, res) => {
    res.status(204).end();
});
app.get('/video', (req, res) => {
    const video = {
        title: 'Cats falling over',
        description: '15 minutes of hilarious fun as cats fall over',  
        length: '15.40'  
    }
    res.json(video);
});
app.get('/colors', (req, res) => {
    const colors = [
        {
            name: 'red',
            rgb: 'FF0000'
        },
        {
            name: 'green',
            rgb: '00FF00'
        },
        {
            name: 'blue',
            rgb: '0000FF'
        },
    ];
    res.json(colors);
});
app.get('/grade', (req, res) => {
    const { mark } = req.query;
    if (!mark) {
        return res.status(400).send('Please provide a mark');
    }
    const numericMark = parseFloat(mark);
    if (Number.isNaN(numericMark)) {
        return res.status(400).send('Mark must be a numeric value');
    }
    if (numericMark < 0 || numericMark > 100) {
        return res.status(400).send('Mark must be in range 0 to 100');
    }
    if (numericMark >= 90) {
        return res.send('A');
    }
    if (numericMark >= 80) {
        return res.send('B');
    }
    if (numericMark >= 70) {
        return res.send('C');
    }
    res.send('F');
});
