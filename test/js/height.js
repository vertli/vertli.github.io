function restHeight(currentTag){
  let h = window.innerHeight;
  let navH = document.getElementById("myTopnav").clientHeight;
  let contact = document.getElementById(currentTag).clientHeight;
  let footer = document.getElementById("footer").clientHeight;
  let temp = navH + contact + footer;
  // console.log(h, temp);
  if (temp < h) {
    let newH = h - footer - navH;
    document.getElementById(currentTag).style.height = newH + "px";
  }
}