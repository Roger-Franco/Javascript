// criou a instância do controller
const controller = new NegociacaoController();

// associa o evento de submissão do formulário à chamada do método "adiciona"

document
  .querySelector('.form')
  .addEventListener('submit', controller.adiciona.bind(controller));

document
  .querySelector('#botao-apaga')
  .addEventListener('click', controller.apaga.bind(controller));

// associando o evento à chamada do método
document
  .querySelector('#botao-importa')
  .addEventListener('click', controller.importaNegociacoes.bind(controller))