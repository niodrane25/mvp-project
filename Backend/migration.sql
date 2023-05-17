-- Create the events table
CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  date DATE,
  time TIME,
  location VARCHAR(255)
);


Insert into events (title) values ('Birthday')