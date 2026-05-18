(function(){
  var btn = document.querySelector('.wi-like-btn');
  if (!btn) return JSON.stringify({error: "no btn"});
  var origFetch = window.fetch;
  var lastRequest = null;
  window.fetch = function() {
    lastRequest = {url: arguments[0], options: arguments[1]};
    return origFetch.apply(this, arguments);
  };
  btn.click();
  return new Promise(function(resolve){
    setTimeout(function(){
      resolve(JSON.stringify({
        lastRequest: lastRequest,
        btnClass: btn.className,
        liked: btn.classList.contains('wi-like-btn--liked'),
        text: btn.closest('.wi-post__like').textContent.trim()
      }));
    }, 3000);
  });
})()
