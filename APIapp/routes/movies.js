const express = require('express');
const router = express.Router();
const axios = require("axios");

var _ = require('lodash');

API_KEY = "bea8e09c";
API_URL = "http://www.omdbapi.com/";

let movies = []

// GET movies listing. 
router.get('/', (req, res, next) => {
    res.status(200).json({ 
      movies: movies 
  })
})

// GET one movie. 
router.get('/:id', (req, res) => {
  const id = req.params.id;

  const movieSelected = _.find(movies, ["id", id ]);
  console.log("id", id, movieSelected);
  res.status(200).json({ 
    message: 'movie found',
    movie: movieSelected
  });

});


// Put new movie. 
router.put("/", (req, res, next) => {
  const {title} = req.body;

  axios.get(`${API_URL}?t=${title}&apikey=${API_KEY}`).then(({data}) => {
    const id = _.uniqueId();
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
    message: `Just added ${title} to the DataBase`,
    movies
  });

  
});

// Update user. 
router.post('/:id', (req,res) => {
  const id = req.params.id;
  const { movie } = req.body;

  const movieToUpdate = _.find(movies, ["id", id]);

  movieToUpdate.movie = movie;

  res.status(200).json ({
    message: `Hey le film ${movieToUpdate.id} a été modifié`,
    movie: movies
  });
});

//Delete specific user. 
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  lodash.remove(movies, ["id", id]);


  res.status(200).json({ 
    message: `Hey, le user #${id} a été supprimé`,
    movies: movies 
});
});

module.exports = router;

