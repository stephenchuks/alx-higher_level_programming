#!/usr/bin/node
const request = require('request');
const movieId = process.argv[2];
const url = `https://swapi-api.hbtn.io/api/films/${movieId}/`;

// Get list of characters and their URLs from the /films endpoint
request(url, (error, response, body) => {
  if (error) {
    console.error(error);
    return;
  }

  const characterUrls = JSON.parse(body).characters;
  const characters = [];

  // Get character names from their URLs and store them in an array
  let completed = 0;
  characterUrls.forEach((url) => {
    request(url, (error, response, body) => {
      if (error) {
        console.error(error);
        return;
      }

      const character = JSON.parse(body).name;
      characters.push({ url, character });
      completed++;

      // Once all characters have been processed, sort them by appearance order and print them
      if (completed === characterUrls.length) {
        characters.sort((a, b) => {
          return a.url.localeCompare(b.url);
        });

        characters.forEach((character) => {
          console.log(character.character);
        });
      }
    });
  });
});

