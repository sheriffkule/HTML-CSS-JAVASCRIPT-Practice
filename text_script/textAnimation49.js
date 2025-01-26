let shadow2 = document.getElementById('shadow2');

document.addEventListener('mousemove', function (e) {
  shadow2.style.transform =
    "rotateX(180deg) skewX(45.25deg) translateX(" +
    e.pageX / 2000 +
    "px" +
    ")" +
    "scaleY(" +
    -e.pageY / 90 +
    ")";
});