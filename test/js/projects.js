// projects
filterSelection("all") // Execute the function and show all columns
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("card");
  if (c == "all") { 
    c = "";
  }
  // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
  for (i = 0; i < x.length; i++) {
    removeClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1){
      addClass(x[i], "show");
    }
  }
}

// Show filtered elements
function addClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

// Hide elements that are not selected
function removeClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1); 
    }
  }
  element.className = arr1.join(" ");
}

// Add active class to the current button (highlight it)
var btnContainer = document.getElementById("projectsBtn");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(){
    var current = document.getElementsByClassName("btn active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

setHeight()
function setHeight() {
  var images = document.getElementsByTagName("img");
  var len = images.length;
  var tempHeight = images[0].height;
  for (i = 1; i < len; i++) {
    if (tempHeight < images[i].height) {
      tempHeight = images[i].height;
    } // end if
  } // end for(i)
  for (i = 0; i < len; i++) {
    images[i].style.height = tempHeight + "px";
  }
  var flipCard = document.querySelectorAll(".flip-card");
  for (f = 0; f < flipCard.length; f++) {
   flipCard[f].style.height = tempHeight + "px";
  }
} // end setHeight()
