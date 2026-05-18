(function(){
  var result = {};
  var h1 = document.querySelector('h1');
  var content = document.querySelector('.wi-post__content, .post-content, article, .content');
  if (h1 && content) {
    var h1Rect = h1.getBoundingClientRect();
    var contentRect = content.getBoundingClientRect();
    result.titleBottom = h1Rect.bottom;
    result.contentTop = contentRect.top;
    result.gap = contentRect.top - h1Rect.bottom;
  } else {
    result.h1Found = !!h1;
    result.contentFound = !!content;
    if (h1) {
      var nextEl = h1.nextElementSibling;
      result.nextElTag = nextEl ? nextEl.tagName : "none";
      result.nextElClass = nextEl ? nextEl.className : "none";
      var h1Rect = h1.getBoundingClientRect();
      if (nextEl) {
        var nextRect = nextEl.getBoundingClientRect();
        result.gap = nextRect.top - h1Rect.bottom;
      }
    }
  }
  var footer = document.querySelector("footer, .footer, #footer");
  if (footer) {
    var footerRect = footer.getBoundingClientRect();
    result.footerBottom = footerRect.bottom;
    result.windowHeight = window.innerHeight;
    result.spaceBelowFooter = window.innerHeight - footerRect.bottom;
    result.docHeight = document.documentElement.scrollHeight;
  }
  return JSON.stringify(result);
})()
