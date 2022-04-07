const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');
// 64rfcU0zjx7C2uFl
const app = express();

mongoose.connect('mongodb://rallyshop:64rfcU0zjx7C2uFl@cluster0-shard-00-00.34aw4.mongodb.net:27017,cluster0-shard-00-01.34aw4.mongodb.net:27017,cluster0-shard-00-02.34aw4.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-m04609-shard-0&authSource=admin&retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to database!')
  })
  // .catch(() => {
  //   console.log('Connection failed!')
  // })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  console.log(post);
  res.status(201).json({
    message: 'Post added successufully'
  });

});

app.get('/api/posts', (req, res, next) => {
  const posts = [
    {
      id: 'gfhry32k',
      title: 'First server-side post',
      content: 'This is coming from the server'
    },
    {
      id: 'cv45kjh5',
      title: 'Second server-side post',
      content: 'This is coming from the server!!!'
    },
  ];
  res.status(200).json({
    message: 'Posts fetched succesfully!',
    posts: posts
  });
});


module.exports = app;
