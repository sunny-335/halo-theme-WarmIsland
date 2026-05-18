(function(){
  var header = document.querySelector('header');
  if (!header) return JSON.stringify({header: "not found"});
  return JSON.stringify({
    className: header.className,
    innerHTML: header.innerHTML.substring(0, 500)
  });
})()
