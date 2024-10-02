let originData = [];

async function logJSONData() {
  const response = await fetch("../doc/projects.json");
  const jsonData = await response.json();
  for (let i in jsonData) {
    originData.push(jsonData[i]);
  }
}

window.addEventListener("load", () => {
  const isDone = logJSONData();
  const intervalID = setInterval(function () {
    if (!isDone) return;
    setCurrentPage(1);
    clearInterval(intervalID);
  }, 100);
});

// display active page
let currentPage;
const cardGallery = document.getElementById("card-gallery");
const setCurrentPage = (pageNum) => {
  currentPage = pageNum;

  cardGallery.innerHTML = "";

  let card_count = 0;
  let row;
  for (let project of originData) {
    // create a row for each 2 cards
    if (card_count % 2 == 0) {
      row = document.createElement("div");
      row.className = "row";
    }

    // set column for each card
    col = document.createElement("div");
    col.className = "card-col col-lg-6 col-md-12 " + project["class"];

    // create card
    const card = document.createElement("div");
    card.className = "card h-100";

    // card image
    const card_image = document.createElement("img");
    card_image.className = "card-img-top img-fluid";
    card_image.setAttribute("src", project["image"]);

    // card body
    const card_body = document.createElement("div");
    card_body.className = "card-body";

    // card title [row]
    const card_title_row = document.createElement("div");
    card_title_row.className = "row";
    // card title
    const card_col_title = document.createElement("div");
    card_col_title.className = "col-10";
    const card_title = document.createElement("h5");
    card_title.className = "card-title";
    card_title.appendChild(document.createTextNode(project["name"]));
    card_col_title.appendChild(card_title);
    // card link
    const card_col_link = document.createElement("div");
    card_col_link.className = "col-2 text-end";
    const card_link = document.createElement("a");
    card_link.setAttribute("href", project["link"][1]);
    const card_link_icon = document.createElement("i");
    if (project["link"][0] === "external") {
      card_link.setAttribute("target", "_blank");
      card_link_icon.className = "fa-brands fa-square-github";
    } else if (project["link"][0] === "internal") {
      card_link_icon.className = "fa-solid fa-link";
    }
    card_link.appendChild(card_link_icon);
    if (project["link"][0] !== "") {
      card_col_link.appendChild(card_link);
    }
    card_title_row.appendChild(card_col_title);
    card_title_row.appendChild(card_col_link);

    // card text
    const card_text_language = document.createElement("h6");
    card_text_language.className = "card-text";
    card_text_language.appendChild(
      document.createTextNode("Language: " + project["language"])
    );
    card_text_summary = document.createElement("p");
    card_text_summary.appendChild(document.createTextNode(project["summary"]));

    // append
    card_body.appendChild(card_title_row);
    card_body.appendChild(card_text_language);
    card_body.appendChild(card_text_summary);
    card.appendChild(card_image);
    card.appendChild(card_body);
    col.appendChild(card);
    row.appendChild(col);
    cardGallery.appendChild(row);

    card_count++;
  }
};
