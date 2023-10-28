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

  function generateRandomString(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    let randomString = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }
  
    return randomString;
  }

  const userData = [];
  for (let i = 1; i <= 1000; i++) {
    const randomString = generateRandomString(5); //
    userData.push([
      randomString + JSON.stringify(new Date().getTime()),
      randomString + JSON.stringify(new Date().getTime()) + '@gmail.com'
    ]);
  }

  const sql = 'INSERT INTO users (username, email) VALUES ?';
  connection.query(sql, [userData], (error, results) => {
    if (error) {
      console.error('Error inserting dummy data:', error);
    } else {
      console.log('Dummy data generated and inserted successfully!');
    }
    
    // Close the database connection after insertion
    connection.end();
  });
});