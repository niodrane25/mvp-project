const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { Pool } = require('pg');

// Set up PostgreSQL connection pool
const pool = new Pool({
  connectionString: 'postgres://niodr:password@localhost:5432/events',
});

app.use(bodyParser.json());

app.use(express.static('Client'))

// Endpoint to store an event in the database
app.post('/store-event', (req, res) => {
  const { title, description, date, time, location } = req.body;

  // Execute the INSERT query to store the event in the database
  pool.query(
    'INSERT INTO events (title, description, date, time, location) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [title, description, date, time, location],
    (error, results) => {
      if (error) {
        console.error('Error storing event:', error);
        res.status(500).json({ error: 'Error storing event' });
      } else {
        res.json(results.rows[0]);
      }
    }
  );
});

app.get('/events', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM events'
    )
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.delete("/events/:id", async (req, res) => {
  const eventId = req.params.id;
  console.log(eventId)
  try {
  pool.query('DELETE FROM events WHERE id = $1', [eventId]);
  res.send('Delete it')
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Listening on port 3000');
});
