const axios = require("axios");
const mysql = require("mysql2");

const XRapidAPIKey = "c32b52ee8dmshc8c69cb7bfcb998p18d113jsn5b0940b502d1";
// const url = "https://moviesdatabase.p.rapidapi.com/titles/x/upcoming";
const url = "https://moviesdatabase.p.rapidapi.com/titles";
const headers = {
  "X-RapidAPI-Key": XRapidAPIKey,
  "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
};

const genre_url = "https://imdb8.p.rapidapi.com/title/get-genres";
const gheaders = {
  "X-RapidAPI-Key": XRapidAPIKey,
  "X-RapidAPI-Host": "imdb8.p.rapidapi.com",
};

const director_url = "https://imdb8.p.rapidapi.com/title/get-top-crew";

const num_calls = 100;

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "cinephiledb",
});

async function fetchData() {
  const arr = [];

  for (let i = 0; i < num_calls; i++) {
    try {
      const response = await axios.get(url, {
        headers: headers,
        params: { page: JSON.stringify(num_calls) },
      });
      const data = response.data;

      for (const result of data.results) {
        const imdb_id = result.id;

        // To get genre information
        const gen_response = await axios.get(genre_url, {
          headers: gheaders,
          params: { tconst: imdb_id },
        });

        let genre;
        if (gen_response.status === 200) {
          genre = gen_response.data;
        } else {
          genre = "NA";
        }

        const director_response = await axios.get(director_url, {
          headers: gheaders,
          params: { tconst: imdb_id },
        });

        let director_names;
        if (director_response.status === 200) {
          director_names = director_response.data.directors.map(
            (direct) => direct.name
          );
        } else {
          director_names = "NA";
        }

        const caption_data = result.primaryImage || {};
        const poster = caption_data.url || "NA";

        const title = caption_data.caption?.plainText || "N/A";

        const plot_data = result.plot || {};
        const plot =
          plot_data.text ||
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat";

        const release_date = result.releaseYear.year;

        // Print or process the extracted information
        console.log(`IMDb ID: ${imdb_id}`);
        // console.log(`Title: ${Title}`);
        console.log(`Release Date: ${release_date}`);
        console.log(`Genre: ${genre}`);
        console.log(`Director: ${director_names}`);
        console.log(`Plot: ${plot}`);
        console.log(`Poster: ${poster}`);
        console.log("\n");

        arr.push([
          title,
          release_date,
          genre.join(", "),
          director_names.join(", "),
          plot,
          poster,
          imdb_id,
        ]);
      }
      // Introduce a delay to avoid hitting rate limits
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Adjust the delay as needed
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  return arr;
}

fetchData()
  .then((data) => {
    console.log(data);
    const sql =
      "INSERT INTO movies (title, released, genre, director, plot, poster, imdb_id) VALUES ?";
    connection.query(sql, [data], (error, results) => {
      if (error) {
        console.error("Error inserting dummy data:", error);
      } else {
        console.log("Dummy data generated and inserted successfully!");
      }

      // Close the database connection after insertion
      connection.end();
    });
  })
  .catch((err) => console.log(err));
