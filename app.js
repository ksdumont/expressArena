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