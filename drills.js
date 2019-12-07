const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.listen(8000, () => {
    console.log('Express server is listening on port 8000!');
});

//Drill 1

app.get('/sum', (req, res) => {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    const c = a + b;
    if (!a) {
        return res.status(400).send('Please provide a value for a')
    }
    if (!b) {
        return res.status(400).send('Please provide a value for b')
    }
    res.send(`The sum of ${a} and ${b} is ${c}`)
})

//Drill 2

app.get('/cipher', (req, res) => {
    const {text, shift} = req.query;
    if (!text) {
        return res.status(400).send('text is required')
    }
    if (!shift) {
        return res.status(400).send('shift is required')
    }
    const numShift = parseFloat(shift);
    if (Number.isNaN(numShift)) {
        return res.status(400).send('shift must be a number');
    }
    const base = 'A'.charCodeAt(0); //get char code
    
    const cipher = text.toUpperCase().split('') //create array of characters
                        .map(char => { 
                        const code = char.charCodeAt(0); //get char code
    //if it is not one of the 26 letters ignore it 
    if (code < base || code > (base + 26)) {
        return char;
    }
    //otherwise convert it, get the distance from A
    let diff = code - base;
    diff = diff + numShift;
    //in case shift takes the value past Z, cycle back to the beggining
    diff = diff % 26;
    //convert back to character
    const shiftedChar = String.fromCharCode(base + diff);
    return shiftedChar;                     
    })
    .join(''); //construct a string from the array
    //Return the response
    res.status(200).send(cipher);
});

//Drill 3

app.get('/lotto', (req, res) => {
    const {numbers} = req.query;
    if (!numbers) {
        return res.status(400).send('numbers is required');
    }
    if (!Array.isArray(numbers)) {
        return res.status(400).send('numbers must be an array');
    }
    const guesses = numbers.map(n => parseInt(n))
                            .filter(n => !Number.isNaN(n) && (n >= 1 && n <= 20));
    if (guesses.length != 6) {
        return res.status(400).send('numbers must contain 6 integers between 1 and 20');
    }
    //numbers are validated
    //here are 20 numbers to choose from
    const stockNumbers = Array(20).fill(1).map((_, i) => i + 1);
    //randomly choose 6
    const winningNumbers = [];
    for (let i = 0; i < 6; i++) {
        const ran = Math.floor(Math.random() * stockNumbers.length);
        winningNumbers.push(stockNumbers[ran]);
        stockNumbers.splice(ran, 1);
    }
    // compare guesses to the winning number
    let diff = winningNumbers.filter(n => !guesses.includes(n));
    //construct the response
    let responseText;
    switch(diff.length) {
        case 0:
            responseText = 'Wow, You could have won the mega millions!';
            break;
        case 1:
            responseText = 'Congrats, you win $100';
            break;
        case 2:
            responseText = 'Congrats, you win a free ticket';
            break;
        default:
            responseText = 'Sorry, you lose';
    }
    res.json({
        guesses, winningNumbers, diff, responseText
    });
    res.send(responseText);
});
