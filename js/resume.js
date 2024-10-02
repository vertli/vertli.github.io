function init() {
  let container = document.getElementsByClassName("container flex-grow-1");
  let h = container[0].offsetHeight;
  let w = container[0].offsetWidth;
  let pdf = document.getElementsByTagName("object");
  pdf[0].height = h - 8;
  pdf[0].width = w - 16;
}
