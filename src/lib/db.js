const Datastore = require('nedb');
const path = require('path');

const db = new Datastore({
  filename: path.join(process.cwd(), 'nedb-data.db'),
  autoload: true
});

module.exports = db;