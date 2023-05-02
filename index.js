// import database
const dbDriver = require('better-sqlite3');
// Connect to db
const db = dbDriver('Bands.sqlite3');

// Import express

const express = require('express');
//Create express app
const app = express();

//Express setup
//Server  a static Frontend

app.use(express.static('frontend'));
// Tell express to use json
app.use(express.json());

// Rest API routes
app.get('/bands',(req,res)=> {
    //req =request
    //res = response

   //Prepare and execute in one line
    const bands = db.prepare('SELECT * FROM bands').all();

    //Send back JSON
    res.json(bands);
        
    
});
app.get('/bands/:id',(req,res) => {
   //Get url id
   const id = req.params.id;

   let statement = db.prepare('SELECT * FROM bands WHERE id = :id');
   let result = statement.all({
    id
   });
   //Send back band or error
   res.json(result[0] || {'error': 'No band matching id'});
});

//Start the server
app.listen(3000, () => {
     console.log('Server started on port 3000.')
});