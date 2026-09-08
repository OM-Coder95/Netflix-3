const cl = console.log;

const showMovieModal = document.getElementById("showMovieModal");
const backdrop = document.getElementById("backdrop");
const movieModal = document.getElementById("movieModal");
const closeMovieModalIcon = document.getElementById("closeMovieModalIcon");
const movieModalCloseBtn = document.getElementById("movieModalCloseBtn");
const movieCardContainer = document.getElementById("movieCardContainer");

const form = document.getElementById("form");
const original_title = document.getElementById("original_title");
const backdrop_path = document.getElementById("backdrop_path");
const overview = document.getElementById("overview");
const vote_average = document.getElementById("vote_average");
const addMovieBtn = document.getElementById("addMovieBtn");
const updateMovieBtn = document.getElementById("updateMovieBtn");

// Data Base

let movieArray3 = movieArray;

localStorage.setItem("movieArray3", JSON.stringify(movieArray3));

// function

// show Hide movieModal

function showHideMovieModal(event) {
  backdrop.classList.toggle("active");
  movieModal.classList.toggle("active");
}

// set array in local Storage

function saveMovieArray() {
  localStorage.setItem("movieArray", JSON.stringify(movieArray));
}

// resetForm()

function resetForm() {
  form.reset();
  updateMovieBtn.classList.add("d-none");
  addMovieBtn.classList.remove("d-none");
  localStorage.removeItem("editId");
}

// showOnUI

function setRating(rating) {
  if (rating > 7) {
    return "badge-success";
  } else if (rating > 5) {
    return "badge-warning";
  } else {
    return "badge-danger";
  }
}

function showOnUI(arr) {
  let result = "";

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
                            <img src="${ele.backdrop_path || ele.poster_path}" alt="${ele.original_title}">
                            <figcaption>
                                <h4 class="m-0">${ele.original_title}</h4>
                                <p class="m-0">${ele.overview}</p>
                            </figcaption>
                        </figure>
                    </div>
                    <div class="card-footer d-flex justify-content-between ">
                        <button onclick="editMovie(this)" class="btn btn-sm net-sec-btn">Edit</button>
                        <button onclick="removeMovie(this)" class="btn btn-sm net-pri-btn">Remove</button>
                    </div>
                </div>
            </div>
        `;
  });
  movieCardContainer.innerHTML = result;
}

showOnUI(movieArray);

// Create

function onMovieAdd(event) {
  event.preventDefault();

  if (
    !original_title.value.trim() ||
    !backdrop_path.value.trim() ||
    !overview.value.trim() ||
    !vote_average.value.trim()
  ) {
    Swal.fire({
      title: "Invalid Input!",
      text: "Please fill all the fields.",
      icon: "warning",
      timer: 2000,
    });
    return;
  }

  let newMovie = {
    id: crypto.randomUUID(),
    original_title: original_title.value,
    backdrop_path: backdrop_path.value,
    overview: overview.value,
    vote_average: vote_average.value,
  };

  movieArray.unshift(newMovie);
  saveMovieArray();
  Swal.fire({
    title: "Movie Added!",
    text: "Movie has been added successfully.",
    icon: "success",
    timer: 2000,
  });
  form.reset();
  showHideMovieModal();

  //   show on UI
  let div = document.createElement("div");

  div.className = `col-md-3 mb-3`;

  div.innerHTML = `
  <div class="card movieCard" id="${newMovie.id}">
                    <div class="card-header d-flex justify-content-between">
                        <h4 class="m-0 ">${newMovie.original_title}</h4>
                        <h5 class="m-0"><span class="badge ${setRating(newMovie.vote_average)}">${newMovie.vote_average}</span></h5>
                    </div>
                    <div class="card-body py-0">
                        <figure class="m-0">
                            <img src="${newMovie.backdrop_path || newMovie.poster_path}" alt="${newMovie.original_title}">
                            <figcaption>
                                <h4 class="m-0">${newMovie.original_title}</h4>
                                <p class="m-0">${newMovie.overview}</p>
                            </figcaption>
                        </figure>
                    </div>
                    <div class="card-footer d-flex justify-content-between ">
                        <button onclick="editMovie(this)" class="btn btn-sm net-sec-btn">Edit</button>
                        <button onclick="removeMovie(this)" class="btn btn-sm net-pri-btn">Remove</button>
                    </div>
                </div>
  `;

  movieCardContainer.prepend(div);
}

// edit MovieCard

function editMovie(ele) {
  let editId = ele.closest(".movieCard").id;
  showHideMovieModal();
  localStorage.setItem("editId", editId);

  let editObj = movieArray.find((ele) => String(ele.id) === editId);
  if (!editObj) return;

  original_title.value = editObj.original_title;
  backdrop_path.value = editObj.backdrop_path;
  overview.value = editObj.overview;
  vote_average.value = editObj.vote_average;

  addMovieBtn.classList.add("d-none");
  updateMovieBtn.classList.remove("d-none");
}

// Updating Movie

function onMovieUpdate() {
  let updateId = localStorage.getItem("editId");

  if (
    !original_title.value.trim() ||
    !backdrop_path.value.trim() ||
    !overview.value.trim() ||
    !vote_average.value.trim()
  ) {
    Swal.fire({
      title: "Invalid Input!",
      text: "Please fill all the fields.",
      icon: "warning",
      timer: 2000,
    });
    return;
  }

  let updatedObj = {
    id: updateId,
    original_title: original_title.value,
    backdrop_path: backdrop_path.value,
    overview: overview.value,
    vote_average: vote_average.value,
  };

  let getIndex = movieArray.findIndex((ele) => String(ele.id) === updateId);
  if (getIndex === -1) return;

  movieArray[getIndex] = updatedObj;
  saveMovieArray();
  Swal.fire({
    title: "Movie Updated!",
    text: "Movie has been updated successfully.",
    icon: "success",
    timer: 2000,
  });
  form.reset();
  showHideMovieModal();
  updateMovieBtn.classList.add("d-none");
  addMovieBtn.classList.remove("d-none");
  localStorage.removeItem("editId");

  document.getElementById(updateId).innerHTML = `
  <div class="card-header d-flex justify-content-between">
                        <h4 class="m-0 ">${updatedObj.original_title}</h4>
                        <h5 class="m-0"><span class="badge ${setRating(updatedObj.vote_average)}">${updatedObj.vote_average}</span></h5>
                    </div>
                    <div class="card-body py-0">
                        <figure class="m-0">
                            <img src="${updatedObj.backdrop_path || updatedObj.poster_path}" alt="${updatedObj.original_title}">
                            <figcaption>
                                <h4 class="m-0">${updatedObj.original_title}</h4>
                                <p class="m-0">${updatedObj.overview}</p>
                            </figcaption>
                        </figure>
                    </div>
                    <div class="card-footer d-flex justify-content-between ">
                        <button onclick="editMovie(this)" class="btn btn-sm net-sec-btn">Edit</button>
                        <button onclick="removeMovie(this)" class="btn btn-sm net-pri-btn">Remove</button>
                    </div>
  `;
}

// remove Movie

function removeMovie(ele) {
  let removeId = ele.closest(".movieCard").id;

  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to recover this movie!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, remove it!",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      let getIndex = movieArray.findIndex((ele) => String(ele.id) === removeId);
      if (getIndex === -1) return;

      movieArray.splice(getIndex, 1);
      saveMovieArray();
      Swal.fire({
        title: "Movie Removed!",
        text: "Movie has been removed successfully.",
        icon: "success",
        timer: 2000,
      });

      ele.closest(".col-md-3").remove();
    }
  });
}

showMovieModal.addEventListener("click", showHideMovieModal);
backdrop.addEventListener("click", showHideMovieModal);
closeMovieModalIcon.addEventListener("click", showHideMovieModal);
movieModalCloseBtn.addEventListener("click", showHideMovieModal);
form.addEventListener("submit", onMovieAdd);
updateMovieBtn.addEventListener("click", onMovieUpdate);

backdrop.addEventListener("click", resetForm);
closeMovieModalIcon.addEventListener("click", resetForm);
movieModalCloseBtn.addEventListener("click", resetForm);
