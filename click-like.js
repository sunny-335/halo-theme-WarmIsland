(function(){
  var btn = document.querySelector('.wi-like-btn');
  if (!btn) return "no btn";
  btn.click();
  return new Promise(function(resolve){
    setTimeout(function(){
      var container = btn.closest('.wi-post__like');
      resolve(JSON.stringify({
        btnClass: btn.className,
        btnDisabled: btn.disabled,
        text: container ? container.textContent.trim() : btn.textContent.trim(),
        liked: btn.classList.contains('wi-like-btn--liked')
      }));
    }, 2000);
  });
})()
