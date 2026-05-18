(function(){
  var h = document.querySelector(".hero");
  if (!h) return "No .hero element found";
  var s = getComputedStyle(h);
  return JSON.stringify({
    width: s.width,
    marginLeft: s.marginLeft,
    marginTop: s.marginTop,
    paddingTop: s.paddingTop,
    left: s.left,
    position: s.position
  });
})()
