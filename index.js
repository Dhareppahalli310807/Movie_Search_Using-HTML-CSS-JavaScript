const form = document.getElementById('search_container');
const input = document.getElementById('search_movie_title');
const moviesListContainer = document.getElementById('movies_list_container');
const overflowIndicator = document.querySelectorAll('.overflow');
//global variables
let searchTerm = '';
let selectedMovie = '';
// Toggle overflow container
function hideOverflow() {
  overflowIndicator.forEach((item) => {
    item.style.opacity = '0';
  });
}
function showOverflow() {
  setTimeout(() => {
    overflowIndicator.forEach((item) => {
      item.style.opacity = '.8';
    });
  }, 2000);
}

hideOverflow();
// Function to render movies in movie containers
function renderMovies(movies) {
  moviesListContainer.innerHTML = '';
  if (movies) {
    movies.forEach((movie) => {
      const movieTitle = movie.Title;
      const movieYear = movie.Year;
      const moviePoster = movie.Poster;
      const movieId = movie.imdbID;

      const movieContainer = document.createElement('div');
      movieContainer.classList.add('movie_container');
      const movieFigure = document.createElement('figure');
      const movieImage = document.createElement('img');
      const movieCaption = document.createElement('figcaption');
      const favButton = document.createElement('button');

      favButton.classList.add('favorite_button');
      favButton.innerHTML =
        'Add to favorites <i class="fa-regular fa-heart"></i>';
      favButton.addEventListener('click', () => {
        let favMovies = JSON.parse(localStorage.getItem('favMovies')) || [];
        favMovies.push({ movieTitle, moviePoster, movieYear, movieId });
        localStorage.setItem('favMovies', JSON.stringify(favMovies));
      });

      movieImage.src = moviePoster;
      movieImage.alt = `${movieTitle} poster`;
      movieImage.classList.add('movie_image');

      movieCaption.textContent = `${movieTitle}, ${movieYear}`;
      movieCaption.classList.add('movie_caption');

      movieFigure.appendChild(movieImage);
      movieFigure.appendChild(movieCaption);
      movieFigure.classList.add('movie_figure');
      movieFigure.addEventListener('click', () => {
        window.location.href = `movieDetails.html?imdbID=${movieId}`;
      });

      movieContainer.appendChild(movieFigure);
      movieContainer.appendChild(favButton);
      moviesListContainer.appendChild(movieContainer);
    });
    showOverflow();
  } else {
    moviesListContainer.innerHTML =
      '<p style="color:#fbee39; font-size:1.5rem; text-align:center; grid-column:1/6;">No results found</p>';
  }
}

// Event listener for input change
input.addEventListener('input', async function () {
  searchTerm = this.value.trim();
  if (searchTerm !== '') {
    const movies = await fetchData(searchTerm);
    renderMovies(movies.Search);
    if (movies.Error) {
      hideOverflow();
    }
  } else {
    moviesListContainer.innerHTML = '';
  }
});

// Event listener for form submission
form.addEventListener('submit', async function (event) {
  event.preventDefault();
  searchTerm = event.target.name.value.trim();
  if (searchTerm !== '') {
    const movies = await fetchData(searchTerm);
    renderMovies(movies.Search);
  }
});

const API = `https://www.omdbapi.com/?apikey=92442014&s=`;
// fetch data
const fetchData = async (searchTerm) => {
  try {
    const res = await fetch(API + searchTerm);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

//switch to favmovies.html
const favMovies = document.getElementById('fav_movies');
favMovies.addEventListener('click', () => {
  window.location.href = 'favMovies.html';
});

hideOverflow();
