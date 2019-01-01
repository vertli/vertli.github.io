let nav = document.getElementById("myTopnav");

/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function navbarUse() {
  
  let rightNav = nav.getElementsByClassName("topnav-right");
  if (rightNav.length > 0) {
    rightNav = rightNav.item(0).getElementsByTagName("a");  
  }
  
  // remove dropNav if navbar has no dropdown content
  let dropNav = nav.getElementsByClassName("dropdown");
  if (dropNav.length > 0) {
    dropNav = dropNav[0].getElementsByClassName("dropdown-content");
    if (dropNav.length > 0) {
      dropNav = dropNav.item(0).getElementsByTagName("a");
    }
  }
  
  if (nav.className === "topnav") {
    nav.className += " responsive";
    
    if (rightNav.length > 0) {
      rightNav = rightNav + " responsive";
    }
    
    if (dropNav.length > 0) {
      let line = document.createElement("HR");
      let text = document.createElement("P");
      text.appendChild(document.createTextNode("Course Notes"));
      nav.appendChild(text);
      nav.appendChild(line);
    }
    
    for (let i = 0; i < dropNav.length; i++) {
      let addr = document.createElement("A");
      addr.setAttribute("href", "#");
      addr.text = dropNav[i].text;
      nav.appendChild(addr);
    }
    
  } else {
    nav.className = "topnav";
    if (rightNav.length > 0) {
      rightNav = "topnav-right";
    }
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
//    if (dropNav.length > 0) {
//      dropNav = dropNav.item(0).getElementsByTagName("a");
//    }
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
