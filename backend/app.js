const express = require('express');
const app = express();
const PORT = 8000;
const worksRoutes = require('./routes/workRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');
const redis = require('redis');
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});
// const responseTime = require('response-time');

module.exports = () => {
  //-------------------------Redis Cached-------------------------
    const client = redis.createClient(6379);

    client.on('error', (err) => {
      console.log("Error" + err);
    });


    //-------------------------Body Parser-------------------------
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cors());
    // app.use(responseTime());

    app.listen(PORT);

    app.get('/', (req,res) => res.json({message: "OK"}));

    app.use('/work', worksRoutes);


    //handle 404 
    app.use((req,res,next) => {
      let err = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    //handle erros Middleware
    app.use((err, req, res, next) => {
      if(err.status === 404){
          res.status(404).json({message: "Not found"});
      } else {
          res.status(500).json({message: "Something looks wrong"})
      }
    });
}