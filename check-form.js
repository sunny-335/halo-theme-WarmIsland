(function(){
  var selects = document.querySelectorAll('select');
  var result = [];
  selects.forEach(function(s, i) {
    result.push({index: i, value: s.value, name: s.name, options: Array.from(s.options).map(function(o){return o.value + ':' + o.text})});
  });
  var inputs = document.querySelectorAll('input');
  var inputResult = [];
  inputs.forEach(function(inp, i) {
    if (inp.type !== 'hidden') {
      inputResult.push({index: i, type: inp.type, name: inp.name, value: inp.value});
    }
  });
  return JSON.stringify({selects: result, inputs: inputResult.slice(0, 10)});
})()
