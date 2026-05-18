(function(){
  return fetch('/apis/api.console.halo.run/v1alpha1/themes/warm-island/setting')
    .then(r => r.text())
    .then(data => data.substring(0, 1000));
})()
