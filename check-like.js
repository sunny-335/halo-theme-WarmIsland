(function(){
  var likeBtn = document.querySelector('.like-btn, .wi-like, [class*="like"], [class*="heart"]');
  if (!likeBtn) {
    var buttons = document.querySelectorAll('button');
    var result = [];
    buttons.forEach(function(b, i) {
      result.push({index: i, text: b.textContent.trim(), className: b.className, innerHTML: b.innerHTML.substring(0, 200)});
    });
    return JSON.stringify({likeBtn: "not found", buttons: result});
  }
  return JSON.stringify({
    className: likeBtn.className,
    text: likeBtn.textContent.trim(),
    innerHTML: likeBtn.innerHTML.substring(0, 300),
    ariaLabel: likeBtn.getAttribute('aria-label')
  });
})()
