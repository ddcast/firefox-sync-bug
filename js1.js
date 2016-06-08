var request = new XMLHttpRequest();
request.open('GET', './hello.txt', false); 
request.send(null);

console.log(request.responseText);

window.myvalue = 'somevalue';
