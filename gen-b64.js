const js = `(function(){var h=document.querySelector(".hero");if(!h)return "No .hero element";var s=getComputedStyle(h);return JSON.stringify({width:s.width,marginLeft:s.marginLeft,marginTop:s.marginTop,paddingTop:s.paddingTop})})()`;
console.log(Buffer.from(js).toString('base64'));
