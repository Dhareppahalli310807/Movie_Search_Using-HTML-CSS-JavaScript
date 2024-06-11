// getting id from url
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

const imdbID = getQueryParam('imdbID');

const API = `https://www.omdbapi.com/?apikey=92442014&i=${imdbID}`;
// fetch data
const fetchData = async () => {
  try {
    const res = await fetch(API);
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const moviePoster = document.getElementById('poster');
const movieTitle = document.getElementById('title');
const movieReleasedDate = document.getElementById('released');
const movieGenre = document.getElementById('genre');
const movieDirector = document.getElementById('director');
const movieActors = document.getElementById('actors');
const moviePlot = document.getElementById('plot');
const movieBoxOffice = document.getElementById('box_office');
const movieRatings = document.getElementById('ratings');

async function renderDetails() {
  const {
    Title,
    Poster,
    Plot,
    Actors,
    BoxOffice,
    Director,
    Genre,
    Ratings,
    Released,
    imdbRating,
  } = await fetchData();
  moviePoster.src = `${Poster}`;
  movieTitle.textContent = `${Title}`;
  movieReleasedDate.textContent = `RELEASED IN : ${Released}`;
  movieGenre.textContent = `GENRE : ${Genre}`;
  movieDirector.textContent = `DIRECTOR : ${Director}`;
  movieActors.textContent = `ACTORS : ${Actors}`;
  moviePlot.textContent = `PLOT : ${Plot}`;
  movieBoxOffice.textContent = `BOX OFFICE COLLECTION : ${BoxOffice}`;
  Ratings.map((rating) => {
    const listElement = document.createElement('li');
    listElement.textContent = `${rating.Source.toUpperCase()} : ${
      rating.Value
    }`;
    movieRatings.appendChild(listElement);
  });
  const listElement = document.createElement('li');
  listElement.textContent = `IMDB : ${imdbRating}/10`;
  movieRatings.appendChild(listElement);
}

renderDetails();
