const pool = require('../database');

pool.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');

  // SQL query to create users table
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      user_id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) UNIQUE,
      email VARCHAR(255) UNIQUE
    )
  `;

  // SQL query to create movies table
  const createMoviesTable = `
    CREATE TABLE IF NOT EXISTS movies (
      movie_id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255),
      released INT,
      genre VARCHAR(255),
      director VARCHAR(255),
      plot TEXT,
      poster VARCHAR(255),
      imdb_id VARCHAR(255)
    )
  `;

  // SQL query to create ratings table
  const createRatingsTable = `
    CREATE TABLE IF NOT EXISTS ratings (
      rating_id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      movie_id INT,
      rating INT,
      FOREIGN KEY (user_id) REFERENCES users(user_id),
      FOREIGN KEY (movie_id) REFERENCES movies(movie_id)
    )
  `;

  // SQL query to create watched_movies table
  const createWatchedMoviesTable = `
    CREATE TABLE IF NOT EXISTS watched_movies (
      watched_id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      movie_id INT,
      FOREIGN KEY (user_id) REFERENCES users(user_id),
      FOREIGN KEY (movie_id) REFERENCES movies(movie_id)
    )
  `;

  // SQL query to create want_to_watch_movies table
  const createWantToWatchMoviesTable = `
    CREATE TABLE IF NOT EXISTS want_to_watch_movies (
      want_to_watch_id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      movie_id INT,
      FOREIGN KEY (user_id) REFERENCES users(user_id),
      FOREIGN KEY (movie_id) REFERENCES movies(movie_id)
    )
  `;

  // Execute the queries
  pool.query(createUsersTable, (err) => {
    if (err) throw err;
    console.log('Users table created');

    pool.query(createMoviesTable, (err) => {
      if (err) throw err;
      console.log('Movies table created');

      pool.query(createRatingsTable, (err) => {
        if (err) throw err;
        console.log('Ratings table created');

        pool.query(createWatchedMoviesTable, (err) => {
          if (err) throw err;
          console.log('Watched Movies table created');

          pool.query(createWantToWatchMoviesTable, (err) => {
            if (err) throw err;
            console.log('Want-To-Watch Movies table created');

            // Close the MySQL pool
            pool.end((endErr) => {
              if (endErr) throw endErr;
              console.log('MySQL pool closed');
            });
          });
        });
      });
    });
  });
});