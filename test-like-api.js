(function(){
  return fetch('/apis/api.halo.run/v1alpha1/posts/5152aea5-c2e8-4717-8bba-2263d46e19d5/likes', {method: 'POST'})
    .then(function(r){
      return r.text().then(function(t){
        return JSON.stringify({status: r.status, body: t.substring(0, 500)});
      });
    });
})()
