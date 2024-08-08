const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const app = express();

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Add this line to parse JSON bodies
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

// MongoDB connection
mongoose.connect('mongodb+srv://Lalit:Lalit7520@lalit.m5d3u.mongodb.net/?retryWrites=true&w=majority&appName=Lalit')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Mongoose schema and model
const itemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String
});

const Item = mongoose.model('Item', itemSchema);

// Routes
app.get('/', (req, res) => {
  res.redirect('/items');
});

// Modified /items route to handle both HTML and JSON responses
app.get('/items', async (req, res) => {
  try {
    const items = await Item.find({}, 'name price description'); // Only select the desired fields
    if (req.headers['accept'] === 'application/json') {
      res.json(items);  // Respond with JSON if requested
    } else {
      res.render('items', { items: items });  // Render HTML otherwise
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

// New API route for JSON responses
app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find({}, 'name price description'); // Only select the desired fields
    res.json(items);  // Always respond with JSON
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/items/new', (req, res) => {
  res.render('new');
});

app.post('/items', async (req, res) => {
  try {
    const newItem = new Item({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description
    });
    await newItem.save();
    res.redirect('/items');
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/items/:id/edit', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    res.render('edit', { item: item });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put('/items/:id', async (req, res) => {
  try {
    await Item.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description
    });
    res.redirect('/items');
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete('/items/:id', async (req, res) => {
  try {
    await Item.findByIdAndRemove(req.params.id);
    res.redirect('/items');
  } catch (err) {
    res.status(500).send(err);
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
