const express = require('express');
const lodash = require('lodash');
const axios = require("axios");

const router = express.Router();

const API_KEY = "bea8e09c";
// Url API
const API_URL = "http://www.omdbapi.com/";

let movies = [{
    id: 1,

    movie: "La bête noire",

    yearOfRelease: 1998,

    duration: 87 /* en minutes*/,

    actors: ["Jacques Lang", "Francois Hollande"],

    poster: "String" /* lien vers une image d'affiche*/,

    boxOffice: 2010 /* en USD$*/,

    rottenTomatoesScore: 2
}];

/* GET movies listing. */
router.get('/', (req, res) => {
    res.status(200).json({ 
      movies: movies 
  });
});

/* GET one movie. */
router.get('/:id', (req, res) => {
  const id = req.params.id;

  const movieSelected = lodash.find(movies, ["id", parseInt(id)]);
  console.log("id", id, movieSelected);
  res.status(200).json({ 
    message: 'movie found',
    movie: movieSelected
  });

});

/* Put new movie. */
router.put('/', (req, res) => {
  const {title} = req.body;

  axios.get(`${API_URL}?t=${title}&appikey=${API_KEY}`).then(({data})=>{
    const id = lodash.uniqueId();
    const title = data.Title;
    const year = data.Year;
    const runtime = data.Runtime;
    const actor = data.Actors;
    const poster = data.Poster;
    const boxo = data.BoxOffice;
    const rotten = data.Ratings[1].Value;
    const list ={"id":id, "movie":title, "yearOfRelease": year, "duration": runtime, "actors": actor, "poster": poster, "boxOffice": boxo, "rottenTomatoesScore": rotten};
    movies.push(list)
  });
  res.status(200).json ({
    movies,
    message: `Just added ${title} to the DataBase`,
  });

  
});

// Update user. 
router.post('/:id', (req,res) => {
  const id = req.params.id;
  const { movie } = req.body;

  const movieToUpdate = lodash.find(movies, ["id", id]);

  movieToUpdate.movie = movie;

  res.status(200).json ({
    message: `Hey le user ${movieToUpdate.id} a été modifié`,
    movie: movies
  });
});

/* Delete specific user. */
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  lodash.remove(movies, ["id", id]);


  res.status(200).json({ 
    message: `Hey, le user #${id} a été supprimé`,
    movies: movies 
});
});

module.exports = router;
