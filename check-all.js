(function(){
  var result = {};
  var hero = document.querySelector(".hero");
  if (hero) {
    var h1 = hero.querySelector("h1");
    var subtitle = hero.querySelector(".hero-subtitle, .subtitle, h2, p");
    result.heroTitle = h1 ? h1.textContent.trim() : "no h1 found";
    result.heroSubtitle = subtitle ? subtitle.textContent.trim() : "no subtitle found";
    result.heroHTML = hero.innerHTML.substring(0, 500);
  } else {
    result.hero = "not found";
  }
  var footer = document.querySelector("footer, .footer, #footer");
  if (footer) {
    result.footerText = footer.textContent.trim().substring(0, 300);
    result.footerHeight = getComputedStyle(footer).height;
    result.footerMarginBottom = getComputedStyle(footer).marginBottom;
    result.footerPaddingBottom = getComputedStyle(footer).paddingBottom;
  } else {
    result.footer = "not found";
  }
  var body = document.body;
  result.bodyMarginBottom = getComputedStyle(body).marginBottom;
  result.bodyPaddingBottom = getComputedStyle(body).paddingBottom;
  result.htmlMarginBottom = getComputedStyle(document.documentElement).marginBottom;
  result.documentHeight = document.documentElement.scrollHeight;
  result.windowHeight = window.innerHeight;
  return JSON.stringify(result);
})()
