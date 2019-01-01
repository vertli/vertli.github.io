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