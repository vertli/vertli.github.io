let nav = document.getElementById("myTopnav");

/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function navbarUse() {
  if (nav.className === "topnav" || nav.className === "topnav sticky") {
    nav.classList.add("responsive");
  } else {
    nav.classList.remove("responsive");
  }
}


// Get the offset position of the navbar
let sticky = nav.offsetTop;
// When the user scrolls the page, execute myFunction 
window.onscroll = function() { 
  // remove dropNav if navbar has no dropdown content
  let dropNav = nav.getElementsByClassName("dropdown");
  if (dropNav.length > 0) {
    dropNav = dropNav[0].getElementsByClassName("dropdown-content");
  }
  // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
  if (window.pageYOffset >= sticky) {
    nav.classList.add("sticky");
    if (dropNav.length > 0 && dropNav[0].className.indexOf("sticky") == -1) {
      dropNav[0].className += " sticky";
    }
  } else {
    nav.classList.remove("sticky");
    if (dropNav.length > 0) {
      dropNav[0].className = "dropdown-content";
    }
  }
};



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