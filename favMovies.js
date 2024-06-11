const moviesListContainer = document.getElementById('movies_list_container');

const favMovies = JSON.parse(localStorage.getItem('favMovies'));

//render movies from local storage
favMovies.forEach((fav, index) => {
  const movieContainer = document.createElement('div');
  movieContainer.classList.add('movie_container');

  const movieFigure = document.createElement('figure');

  const movieImage = document.createElement('img');
  movieImage.src = fav.moviePoster;
  movieImage.alt = `${fav.movieTitle} poster`;
  movieImage.classList.add('movie_image');

  const movieCaption = document.createElement('figcaption');
  movieCaption.textContent = `${fav.movieTitle}, ${fav.movieYear}`;
  movieCaption.classList.add('movie_caption');

  const removeFavButton = document.createElement('button');
  removeFavButton.classList.add('remove_favorite_button');
  removeFavButton.innerHTML =
    'Remove Favorite <i class="fa-solid fa-heart-crack"></i>';
  removeFavButton.addEventListener('click', () => {
    removeFavorite(index);
    movieContainer.remove(); // Remove the movie container from the DOM
  });

  movieFigure.appendChild(movieImage);
  movieFigure.appendChild(movieCaption);
  movieFigure.classList.add('movie_figure');

  movieContainer.appendChild(movieFigure);
  movieContainer.appendChild(removeFavButton);

  moviesListContainer.appendChild(movieContainer);
});

function removeFavorite(index) {
  let favMovies = JSON.parse(localStorage.getItem('favMovies')) || [];
  favMovies.splice(index, 1); // Remove the movie at the specified index
  localStorage.setItem('favMovies', JSON.stringify(favMovies));
}
