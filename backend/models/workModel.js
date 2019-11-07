let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017', {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});
let Schema = mongoose.Schema;

let blogSchema = new Schema({
    title: String,
    author: String,
})

let Blog = mongoose.model('Blog', blogSchema);