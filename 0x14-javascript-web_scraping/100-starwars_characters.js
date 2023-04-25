#!/usr/bin/node

const request = require('request');
const apiUrl = 'https://swapi-api.hbtn.io/api';

function getMovieCharacters (movieId) {
  const movieUrl = `${apiUrl}/films/${movieId}/`;
  request(movieUrl, (error, response, body) => {
    if (error) {
      console.error('Error:', error);
    } else if (response.statusCode !== 200) {
      console.error('Unexpected status code:', response.statusCode);
    } else {
      const movieData = JSON.parse(body);
      const characterUrls = movieData.characters;
      characterUrls.forEach((characterUrl) => {
        request(characterUrl, (error, response, body) => {
          if (error) {
            console.error('Error:', error);
          } else if (response.statusCode !== 200) {
            console.error('Unexpected status code:', response.statusCode);
          } else {
            const characterData = JSON.parse(body);
            console.log(characterData.name);
          }
        });
      });
    }
  });
}

const movieId = process.argv[2];
getMovieCharacters(movieId);
