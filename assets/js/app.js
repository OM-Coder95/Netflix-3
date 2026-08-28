const cl = console.log;

const showMovieModal = document.getElementById("showMovieModal");
const backdrop = document.getElementById("backdrop");
const movieModal = document.getElementById("movieModal");
const closeMovieModalIcon = document.getElementById("closeMovieModalIcon");
const movieModalCloseBtn = document.getElementById("movieModalCloseBtn");
const movieCardContainer = document.getElementById("movieCardContainer");

// Data Base

let jsonArray = localStorage.getItem("movieArray");

let movieArray = jsonArray ? JSON.parse(jsonArray) : [];

// function

// showOnUI

function showOnUI(arr) {
  let result = "";

  function setRating(rating) {
    if (rating > 7) {
      return "badge-success";
    } else if (rating > 5 && rating <= 7) {
      return "badge-warning";
    } else {
      return "bage-danger";
    }
  }

  arr.forEach((ele) => {
    result += `
        <div class="col-md-3 mb-3">
                <div class="card movieCard" id="${ele.id}">
                    <div class="card-header d-flex justify-content-between">
                        <h4 class="m-0 ">${ele.original_title}</h4>
                        <h5 class="m-0"><span class="badge ${setRating(ele.vote_average)}">${ele.vote_average}</span></h5>
                    </div>
                    <div class="card-body py-0">
                        <figure class="m-0">
                            <img src="https://image.tmdb.org/t/p/w500/${ele.backdrop_path || ele.poster_path}" alt="${ele.original_title}">
                            <figcaption>
                                <h4 class="m-0">${ele.original_title}</h4>
                                <p class="m-0">${ele.overview}</p>
                            </figcaption>
                        </figure>
                    </div>
                    <div class="card-footer d-flex justify-content-between ">
                        <button class="btn btn-sm net-sec-btn">Edit</button>
                        <button class="btn btn-sm net-pri-btn">Remove</button>
                    </div>
                </div>
            </div>
        `;
  });
  movieCardContainer.innerHTML = result;
}

showOnUI(movieArray)

function showHideMovieModal(event) {
  backdrop.classList.toggle("active");
  movieModal.classList.toggle("active");
}

showMovieModal.addEventListener("click", showHideMovieModal);
backdrop.addEventListener("click", showHideMovieModal);
closeMovieModalIcon.addEventListener("click", showHideMovieModal);
movieModalCloseBtn.addEventListener("click", showHideMovieModal);
