-- Create the users table
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

-- Insert initial data into the users table
INSERT INTO users (name, email, password)
VALUES
  ('John Doe', 'john@example.com', 'password1'),
  ('Jane Smith', 'jane@example.com', 'password2');
