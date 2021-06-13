let jsSrc = [
    "asset.js",
    "objectModel.js",
    "trapModel.js",
    "boxModel.js",
    "boxView.js",
    "doorModel.js",
    "doorView.js",
    "slimeModel.js",
    "slimeView.js",
    "levelModel.js",
    "levelView.js",
    "levelOneModel.js",
    "levelOneView.js",
    "slimeEscape.js"
];

for (let i = 0; i < jsSrc.length; i++) {
    var s = document.createElement("script");
    s.setAttribute("src", "./SlimeEscapeJS/" + jsSrc[i]);
    document.body.appendChild(s);
} // end for(i)