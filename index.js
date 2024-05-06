const path = require('path');
const express = require('express');
const cors = require('cors');

const port = process.env.APP_PORT || 3555;

const app = express();
// Middlewares
app.set('trust proxy', true);
app.use(cors());
app.use(express.json({ limit:'2mb' }));
app.use(express.urlencoded({ limit:'1mb', extended: true, parameterLimit: 50 }));
app.use(express.static(path.join(__dirname, 'public')));

function getDateStr () {
  const date = new Date();
  return date.toLocaleString();
}

app.get('/', function(req, res) {
  res.status(200)
    .send({
      server: 'Simple API',
      status: 'Success',
      api: {
        v1: '/api/v1',
      },
      date: getDateStr()
    });
});

app.get('/api/v1/links', function(req, res) {
  let models = [
    { id: 1, title: 'Link 1' },
    { id: 2, title: 'Link 2' },
    { id: 3, title: 'Link 3' },
    { id: 4, title: 'Link 4' },
    { id: 5, title: 'Link 5' },
    { id: 6, title: 'Link 6' },
    { id: 7, title: 'Link 7' },
    { id: 8, title: 'Link 8' },
  ];

  const pageSize = req.query.pageSize;
  if (pageSize) {
    models = models.slice(0, pageSize);
  }

  res.status(200)
    .send({
      date: getDateStr(),
      models
    });
});

app.get('/api/v1/links/:id', function(req, res) {
  const id = req.params.id;
  res.status(200)
    .send({ date: getDateStr(), model: { id, title: `Link ${1}` } });
});

app.get('/api/v1/countries', function(req, res) {
  let models = [
    { id: 1, title: 'Haiti' },
    { id: 2, title: 'Brazil' },
    { id: 3, title: 'Russia' },
    { id: 4, title: 'India' },
    { id: 5, title: 'China' },
    { id: 6, title: 'South Africa' },
  ];

  const pageSize = req.query.pageSize;
  if (pageSize) {
    models = models.slice(0, pageSize);
  }

  res.status(200)
    .send({
      date: getDateStr(),
      models
    });
});

app.get('/api/v1/comments/link/:id', function(req, res) {
  const id = req.params.id;
  let models = [
    { id: 1, link_id: id, content: `Comment 1 for Link ${id}` },
    { id: 2, link_id: id, content: `Comment 2 for Link ${id}` },
    { id: 3, link_id: id, content: `Comment 3 for Link ${id}` },
    { id: 4, link_id: id, content: `Comment 4 for Link ${id}` },
    { id: 5, link_id: id, content: `Comment 5 for Link ${id}` },
    { id: 6, link_id: id, content: `Comment 6 for Link ${id}` },
    { id: 7, link_id: id, content: `Comment 7 for Link ${id}` },
    { id: 8, link_id: id, content: `Comment 8 for Link ${id}` },
  ];

  const pageSize = req.query.pageSize;
  if (pageSize) {
    models = models.slice(0, pageSize);
  }

  res.status(200)
    .send({
      date: getDateStr(),
      models
    });
});

app.get('/api/v1/black-hole', function(req, res) {
  res.status(404)
    .send({ date: getDateStr(), message: 'Resource Not Found' });
});

app.listen(port, function() {
  console.log(`Simple API Server is listening to port ${port}`);
});