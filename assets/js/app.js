const cl = console.log;

const showMovieModal = document.getElementById("showMovieModal");
const backdrop = document.getElementById("backdrop");
const movieModal = document.getElementById("movieModal");
const closeMovieModalIcon = document.getElementById("closeMovieModalIcon");
const movieModalCloseBtn = document.getElementById("movieModalCloseBtn");

// Data Base 

let movieArray = movieArray1;

localStorage.setItem("movieArray", JSON.stringify(movieArray));

cl(movieArray)


// function

function showHideMovieModal(event) {
  backdrop.classList.toggle("active");
  movieModal.classList.toggle("active");
}

showMovieModal.addEventListener("click", showHideMovieModal);
backdrop.addEventListener("click", showHideMovieModal);
closeMovieModalIcon.addEventListener("click", showHideMovieModal);
movieModalCloseBtn.addEventListener("click", showHideMovieModal);
