// criou a instância do controller
const controller = new NegociacaoController();

// criou o alias
const $ = document.querySelector.bind(document);

$('.form')
  .addEventListener('submit', controller.adiciona.bind(controller));

$('#botao-apaga')
  .addEventListener('click', controller.apaga.bind(controller));

// associando o evento à chamada do método
$('#botao-importa')
  .addEventListener('click', controller.importaNegociacoes.bind(controller))