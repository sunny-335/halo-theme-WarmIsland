(function(){
  return fetch('/apis/api.console.halo.run/v1alpha1/themes?sort=creationTimestamp%2Cdesc')
    .then(r => r.json())
    .then(data => {
      var items = data.items || [];
      var result = items.map(t => ({
        name: t.metadata.name,
        displayName: t.spec.displayName,
        active: !!t.spec.activationTime
      }));
      return JSON.stringify(result);
    });
})()
