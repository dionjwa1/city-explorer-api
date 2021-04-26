// 'use strict';
const superagent = require('superagent');
const cache = {};

async function getMovieHandler(request, response) {
  console.log(request.query.location);
  let cacheKey = 'movies-' + request.query.location;
  const cachedMovieInfo = cache[cacheKey];
  if (cachedMovieInfo === undefined) {
    const cityName = request.query.location;
    const movieKey = process.env.MOVIE_API_KEY;
    const movieUrl = `https://api.themoviedb.org/3/search/movie?query=${cityName}&api_key=${movieKey}&page=1`;

    const movieResponse = await superagent.get(movieUrl);
    const movieObject = JSON.parse(movieResponse.text);
    const movie = movieObject.results.map(movie => new Movies(movie));
    cache[cacheKey] = movie;
    response.send(movie);
  } else {
    console.log('cached');
    response.send(cachedMovieInfo);
  }

}

class Movies {
  constructor(movie) {
    this.title = movie.title;
    this.overview = movie.overview;
    this.popularity = movie.popularity;
    this.img_path = movie.poster_path || movie.backdrop_path;
    this.img_Url = this.img_path ? `https://image.tmdb.org/t/p/w500${this.img_path}` : `https://http.cat/405`;
  }
}

module.exports = getMovieHandler;
