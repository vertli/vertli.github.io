let originData = [];
const challengeImg = "../img/pokemon/leagueChallenge.png";
const cupImg = "../img/pokemon/leagueCup.png";

async function logJSONData() {
  const response = await fetch("./pokemon/eventList.json");
  const jsonData = await response.json();
  for (let i in jsonData) {
    originData.push(jsonData[i]);
  }
}

window.addEventListener("load", () => {
  const isDone = logJSONData();
  const intervalID = setInterval(function () {
    if (!isDone) return;
    originData.sort(function (a, b) {
      return a.datetime.localeCompare(b.datetime);
    });
    console.log(originData);
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

  for (let event of originData) {
    const card = document.createElement("div");
    card.className = "eventCard col-xl-6 col-md-6 col-sm-12";
    const gallery = document.createElement("div");
    gallery.className = "gallery";

    const img = document.createElement("img");
    if (event["type"] == "Cup") {
      img.setAttribute("src", cupImg);
    } else {
      img.setAttribute("src", challengeImg);
    }
    gallery.appendChild(img);

    const desc = document.createElement("div");
    desc.className = "desc";
    const name = document.createElement("h3");
    name.appendChild(document.createTextNode(event["name"]));
    const store = document.createElement("h4");
    store.appendChild(document.createTextNode("City: " + event["city"]));
    const datetime = document.createElement("h4");
    datetime.appendChild(
      document.createTextNode("Date: " + event["date"] + "@" + event["time"])
    );
    desc.appendChild(name);
    desc.appendChild(store);
    desc.appendChild(datetime);
    gallery.appendChild(desc);
    card.appendChild(gallery);
    cardGallery.appendChild(card);
  }
};
