(function(){
  return fetch('/apis/api.console.halo.run/v1alpha1/configmaps/warm-island-config')
    .then(r => r.text())
    .then(data => data.substring(0, 3000));
})()
