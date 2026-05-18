(function(){
  var nav = document.querySelector("nav, .navbar, .nav, header nav, .header-nav");
  if (!nav) return JSON.stringify({nav: "not found"});
  var s = getComputedStyle(nav);
  var parent = nav.parentElement;
  var ps = parent ? getComputedStyle(parent) : null;
  return JSON.stringify({
    navClass: nav.className,
    navWidth: s.width,
    navMargin: s.margin,
    navBorderRadius: s.borderRadius,
    navBorder: s.border,
    navPadding: s.padding,
    parentClass: parent ? parent.className : "none",
    parentWidth: ps ? ps.width : "none",
    parentBorderRadius: ps ? ps.borderRadius : "none"
  });
})()
