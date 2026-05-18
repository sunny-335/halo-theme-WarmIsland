(function(){
  var navbar = document.querySelector('.wi-navbar');
  if (!navbar) return JSON.stringify({navbar: "not found"});
  return JSON.stringify({
    className: navbar.className,
    allClasses: navbar.className
  });
})()
