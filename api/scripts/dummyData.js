const mysql = require('mysql2');

// Create a MySQL database connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'cinephiledb',
});

// Connect to the MySQL database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');

  // Generate dummy data (example: 100 movies)
  const dummyData = [];
  for (let i = 1; i <= 100; i++) {
    dummyData.push([
      `title fast and furious`,
      Math.floor(Math.random() * 1000) + 2000,
        `genre action`,
        `director bruce lee`,
        `plot ${i}`,
        'poster https://m.media-amazon.com/images/M/MV5BM2ZlYjA4NmItZTYxYy00MGFiLTg3MWUtNzZmYjE1ODZmMThjXkEyXkFqcGdeQXVyNTI2NTY2MDI@._V1_.jpg',
        // Add more properties as needed
    ]);
  }

  // SQL query to insert dummy data into the movies table
  const sql = 'INSERT INTO movies (title, released, genre, director, plot, poster) VALUES ?';
  connection.query(sql, [dummyData], (error, results) => {
    if (error) {
      console.error('Error inserting dummy data:', error);
    } else {
      console.log('Dummy data generated and inserted successfully!');
    }
    
    // Close the database connection after insertion
    connection.end();
  });
});