const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');
// 64rfcU0zjx7C2uFl
const app = express();

mongoose
  .connect(
    'mongodb://rallyshop:64rfcU0zjx7C2uFl@cluster0-shard-00-00.34aw4.mongodb.net:27017,cluster0-shard-00-01.34aw4.mongodb.net:27017,cluster0-shard-00-02.34aw4.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-m04609-shard-0&authSource=admin&w=majority'
  )
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.log('Connection failed!');
  })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/images', express.static(path.join('backend/images')))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});

app.use('/api/posts', postsRoutes);
app.use('/api/user', userRoutes);

module.exports = app;
