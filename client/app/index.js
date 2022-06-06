
var campos = [
  document.querySelector('#data'),
  document.querySelector('#valor'),
  document.querySelector('#quantidade')
];


console.log(campos); // verificando o conteúdo do array

// precisamos de tbody, pois ele receberá a tr que vamos construir
var tbody = document.querySelector('table tbody');

document.querySelector('.form').addEventListener('submit', function (event) {
  alert('Oi!!')
})