const express = require('express');
const app = express();
const PORT = 8000;
const works = require('./routes/works');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.listen(PORT, ()=> console.log(`Simple Backend running on Port ${PORT}`));

app.get('/', (req,res) => res.json({message: "OK"}));

app.use('/work', works);

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