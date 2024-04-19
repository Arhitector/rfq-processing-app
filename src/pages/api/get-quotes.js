const db = require('../../lib/db');

export default function handler(req, res) {
  if (req.method === 'GET') {
    db.find({}, (err, docs) => {
      if (err) {
        res.status(500).json({ message: 'Error fetching quotes.' });
        return;
      }
      res.status(200).json(docs);
    });
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
