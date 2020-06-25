// bring express into your project
// you will need to `npm init` and `npm install express` first

// create your express app
let express = require('express');

// creates an instance of express to do all the web server things
const app = express();

//storing on the server, so it doesn't go away when the page refreshes
const inventory = [
  {
    name: 'Apple',
    description: 'a crisp, tart treat'
  },
];

// setup the public directory for static files
// any files in here can be sent back to web browsers or clients
app.use( express.static( 'server/public' ) );

// Tell express how to read the request body
let bodyParser = require('body-parser');
app.use( bodyParser.urlencoded( {extended: true} ) );
app.use( bodyParser.json() );

// Tell the server to listen on a specific port
const port = 5000
app.listen( port, () => {
  console.log( 'Server is listening on port', port );
})


app.post('/add-item', (req, res) => {
  let item = req.body;
  //if this is an empty object, it means that you forgot bodyParser
  console.log('Got new item', item);

  inventory.push(item);
  res.sendStatus(201);
})



app.get('/inventory', (req, res) => {
  res.send(inventory);
});

/*
app.get('/song', (req, res) => {
  res.send(songListArray);
});

app.get('/album', (req, res) => {
  res.send(albumListArray);
});*/