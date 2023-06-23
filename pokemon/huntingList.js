// import huntingList from "./huntingList.json" assert { type: "json" };
// let cardData = huntingList["cardData"];

const paginationNumbers = document.getElementById("pagination-numbers");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const paginationLimit = 16;
let cardData = [];
let pageCount = 0;

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
  button.disabled = true;
  button.classList.add("disabled");
  button.style.color = "#777";
  // button.setAttribute("disabled", true);
  // button.setAttribute("hidden", true);
};

// enable page navigation buttons
const enableButton = (button) => {
  button.disabled = false;
  button.classList.remove("disabled");
  button.style.color = "white";
  // button.removeAttribute("disabled");
  // button.removeAttribute("hidden");
};

const handlePageButtonsStatus = () => {
  if (currentPage === 1) {
    prevButton.addEventListener("click", disableButton(prevButton));
    // disableButton(prevButton);
  } else {
    prevButton.addEventListener("click", enableButton(prevButton));
    // disableButton(prevButton);
  }
  if (pageCount === currentPage) {
    nextButton.addEventListener("click", disableButton(nextButton));
    // disableButton(nextButton);
  } else {
    nextButton.addEventListener("click", enableButton(nextButton));
    // enableButton(nextButton);
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

async function logJSONData() {
  const response = await fetch("./pokemon/huntingList.json");
  const jsonData = await response.json();
  cardData = jsonData["cardData"];
  return true;
}

function init() {
  pageCount = Math.ceil(cardData.length / paginationLimit);
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
}

window.addEventListener("load", () => {

  const isDone = logJSONData();

  const intervalID = setInterval(function() {
    if (!isDone) return;
    init();
    clearInterval(intervalID);
  }, 100);
});