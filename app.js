const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

// express app
const app = express();

// connect to mongodb & listen for requests
const dbURI = "mongodb+srv://netninja:ninja1234@nodetuts.dcblm.mongodb.net/nodetuts?retryWrites=true&w=majority";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => {
      console.log('Server running on port 3000');
    });
  })
  .catch(err => console.log(err));


// register view engine
app.set('view engine', 'ejs');
// Middleware & static files
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true })); // ✅ Added to parse form data
app.use(express.json()); // ✅ Added to parse JSON requests

app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});


// routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
  });
  
  app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
  });
  

  // blog routes
app.use('/blogs', blogRoutes);
  
  // 404 page
  app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
  });