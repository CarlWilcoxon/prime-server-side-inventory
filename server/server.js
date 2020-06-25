// bring express into your project
// you will need to `npm init` and `npm install express` first

// create your express app
let express = require('express');

// creates an instance of express to do all the web server things
const app = express();
const inv = require('./modules/inventory')

// setup the public directory for static files
// any files in here can be sent back to web browsers or clients
app.use( express.static( 'server/public' ) );

// Tell the server to listen on a specific port
// 
const port = 5000
app.listen( port, () => {
  console.log( 'Server is listening on port', port );
})

// -------- BASE -----//

// Create your `/train` route here
// when a user visits localhost:5000/train
// this route should return the array of trains

app.get('/train', (req, res) => {
    res.send(trains);
})


// -------- STRETCH -----//

// Create your `/count` route here
// when a user visits localhost:5000/count
// this route should return the number of trains in the array
// NOTE: express doesn't like it when you return numbers
// instead, return an object like { totalCount: 4 }

app.get('/count', (req, res) => {
    res.send({totalCount: trains.length});
})


// Create your `/random` route here
// when a user visits localhost:5000/random
// this route should return a single train at random

app.get('/random', (req, res) => {
    res.send({randomTrain: trains[Math.floor(Math.random()*(trains.length))]});
})


// -------- BASE -----//

// Don't forget to start your app by running `.listen()`