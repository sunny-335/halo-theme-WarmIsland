(function(){
  var likeBtn = document.querySelector('.wi-like-btn');
  if (!likeBtn) return JSON.stringify({likeBtn: "not found"});
  var likeContainer = likeBtn.closest('.wi-post__like');
  return JSON.stringify({
    btnClass: likeBtn.className,
    btnDisabled: likeBtn.disabled,
    containerClass: likeContainer ? likeContainer.className : "none",
    text: likeContainer ? likeContainer.textContent.trim() : likeBtn.textContent.trim(),
    liked: likeBtn.classList.contains('wi-like-btn--liked') || (likeContainer && likeContainer.classList.contains('wi-post__like--liked')),
    svgFill: likeBtn.querySelector('svg') ? getComputedStyle(likeBtn.querySelector('svg')).fill : "none"
  });
})()
