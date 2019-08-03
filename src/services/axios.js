import axios from "axios";

const apiKey = "72e7137873e2605f83ce8c252d7d7e2c";

const personSearch = function(searchText) {
  return axios
    .get(
      `https://api.themoviedb.org/3/search/person?api_key=${apiKey}&language=en-US&query=${searchText}&page=1&include_adult=false`
    )
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
    });
};

const personFilmSearch = function(personId) {
  return axios
    .get(
      `https://api.themoviedb.org/3/person/${personId}/combined_credits?api_key=${apiKey}&language=en-US`
    )
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
    });
};

const movieSearch = function(movieId) {
  return axios
    .get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`
    )
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
    });
};

const tvSearch = function(tvId) {
  return axios
    .get(
      `https://api.themoviedb.org/3/tv/${tvId}?api_key=${apiKey}&language=en-US`
    )
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
    });
};

const tvExtIdSearch = function(tvId) {
  return axios
    .get(
      `https://api.themoviedb.org/3/tv/${tvId}/external_ids?api_key=${apiKey}&language=en-US`
    )
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
    });
};

export default {
  personSearch,
  personFilmSearch,
  movieSearch,
  tvSearch,
  tvExtIdSearch
};
