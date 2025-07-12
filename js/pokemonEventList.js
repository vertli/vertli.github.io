let originData = [];
const challengeImg = "../img/pokemon/leagueChallenge.png";
const cupImg = "../img/pokemon/leagueCup.png";

async function logJSONData() {
  const response = await fetch("../doc/pokemonEventList.json");
  const jsonData = await response.json();
  const timestamp = jsonData["timestamp"];
  const lastUpdate = document.getElementById("last-update");
  lastUpdate.innerText = timestamp;
  const allEvents = jsonData["events"];
  console.log(jsonData);
  for (let i in allEvents) {
    originData.push(allEvents[i]);
    console.log(allEvents[i]);
  }
}

window.addEventListener("load", () => {
  const isDone = logJSONData();
  const intervalID = setInterval(function () {
    if (!isDone) return;
    originData.sort(function (a, b) {
      return a.datetime.localeCompare(b.datetime);
    });
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
  for (let event of originData) {
    // create a row for each 2 cards
    if (card_count % 2 == 0) {
      row = document.createElement("div");
      row.className = "row";
    }

    // set column for each card
    col = document.createElement("div");
    col.className = "col-lg-6 col-md-12";

    // create card
    const card = document.createElement("div");
    card.className = "card";
    const card_row = document.createElement("div");
    card_row.className = "row g-0";

    // create image
    const card_img_col = document.createElement("div");
    card_img_col.className = "col-md-4";
    const img = document.createElement("img");
    img.className = "img-fluid rounded-start";
    if (event["type"] == "Cup") {
      img.setAttribute("src", cupImg);
      card.className += " cup";
    } else {
      img.setAttribute("src", challengeImg);
      card.className += " challenge";
    }
    card_img_col.appendChild(img);

    // create info
    const card_body_col = document.createElement("div");
    card_body_col.className = "col-md-8";
    const card_body = document.createElement("div");
    card_body.className = "card-body";
    // card title
    const card_title = document.createElement("h5");
    card_title.className = "card-title";
    card_title.appendChild(document.createTextNode(event["name"]));
    // card text
    const card_text_store = document.createElement("h6");
    card_text_store.className = "card-text";
    card_text_store.appendChild(
      document.createTextNode("City: " + event["city"])
    );
    const card_text_date = document.createElement("h6");
    card_text_date.className = "card-text";
    card_text_date.appendChild(
      document.createTextNode("Date: " + event["date"] + "@" + event["time"])
    );
    // append card
    card_row.appendChild(card_img_col);
    card_body.appendChild(card_title);
    card_body.appendChild(card_text_store);
    card_body.appendChild(card_text_date);
    card_body_col.appendChild(card_body);
    card_row.appendChild(card_body_col);
    card.appendChild(card_row);
    col.appendChild(card);
    row.appendChild(col);
    cardGallery.append(row);

    card_count++;
  }
};
