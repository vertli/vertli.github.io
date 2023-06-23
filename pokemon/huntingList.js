// https://webdesign.tutsplus.com/tutorials/pagination-with-vanilla-javascript--cms-41896
// read first

import huntingList from "./huntingList.json" assert { type: "json" };
let cardData = huntingList["cardData"];
console.log(cardData);

// pagination logic starts here
const paginationNumbers = document.getElementById("pagination-numbers");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");

const paginationLimit = 16;
const pageCount = Math.ceil(cardData.length / paginationLimit);

// add page numbers into pagination bar
const appendPageNumber = (index) => {
  const pageNumber = document.createElement("button");
  pageNumber.className = "pagination-number";
  pageNumber.innerHTML = index;
  pageNumber.setAttribute("page-index", index);
  pageNumber.setAttribute("aria-label", "Page " + index);
  paginationNumbers.appendChild(pageNumber);
};

const getPaginationNumbers = () => {
  for (let i = 1; i <= pageCount; i++) {
    appendPageNumber(i);
  }
};

// set active page number
const handleActivePageNumber = () => {
  document.querySelectorAll(".pagination-number").forEach((button) => {
    button.classList.remove("active");
    const pageIndex = Number(button.getAttribute("page-index"));
    if (pageIndex == currentPage) {
      button.classList.add("active");
    }
  });
};

// disable page navigation buttons
const disableButton = (button) => {
  button.classList.add("disabled");
  // button.setAttribute("disabled", true);
  button.setAttribute("hidden", true);
};

// enable page navigation buttons
const enableButton = (button) => {
  button.classList.remove("disabled");
  //button.removeAttribute("disabled");
  button.removeAttribute("hidden");
};

const handlePageButtonsStatus = () => {
  if (currentPage === 1) {
    disableButton(prevButton);
  } else {
    enableButton(prevButton);
  }
  if (pageCount === currentPage) {
    disableButton(nextButton);
  } else {
    enableButton(nextButton);
  }
};

// display active page
let currentPage;
const cardGallery = document.getElementById("card-gallery");
const setCurrentPage = (pageNum) => {
  currentPage = pageNum;

  handleActivePageNumber();
  handlePageButtonsStatus();

  const prevRange = (pageNum - 1) * paginationLimit;
  const currRange = pageNum * paginationLimit;
  cardGallery.innerHTML = "";

  for (let idx = prevRange; idx < currRange; idx++) {
    if (idx >= cardData.length) break;
    const card = document.createElement("div");
    card.className = "card col-xl-3 col-sm-12 col-md-6";
    const gallery = document.createElement("div");
    gallery.className = "gallery";
    const img = document.createElement("img");
    img.setAttribute("src", cardData[idx]["url"]);
    img.setAttribute("alt", cardData[idx]["name"]);
    gallery.appendChild(img);
    const desc = document.createElement("div");
    desc.className = "desc";
    const name = document.createElement("h3");
    name.appendChild(document.createTextNode(cardData[idx]["name"]));
    const set = document.createElement("h4");
    set.appendChild(document.createTextNode(cardData[idx]["set"]));
    desc.appendChild(name);
    desc.appendChild(set);
    gallery.appendChild(desc);
    card.appendChild(gallery);
    cardGallery.appendChild(card);
  }
}

window.addEventListener("load", () => {
  getPaginationNumbers();
  setCurrentPage(1);
  prevButton.addEventListener("click", () => {
    setCurrentPage(currentPage - 1);
  });
  nextButton.addEventListener("click", () => {
    setCurrentPage(currentPage + 1);
  });
  document.querySelectorAll(".pagination-number").forEach((button) => {
    const pageIndex = Number(button.getAttribute("page-index"));
    if (pageIndex) {
      button.addEventListener("click", () => {
        setCurrentPage(pageIndex);
      });
    }
  });
});