(function(){
  return fetch('/apis/api.console.halo.run/v1alpha1/themes/warm-island')
    .then(r => r.json())
    .then(data => JSON.stringify({
      settingName: data.spec.settingName,
      configMapName: data.spec.configMapName
    }));
})()
