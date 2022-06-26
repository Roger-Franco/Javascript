System.register(['./controllers/NegociacaoController'], function (_export, _context) {
  "use strict";

  var NegociacaoController;
  return {
    setters: [function (_controllersNegociacaoController) {
      NegociacaoController = _controllersNegociacaoController.NegociacaoController;
    }],
    execute: function () {
      // criou a instância do controller
      const controller = new NegociacaoController();

      // criou o alias
      const $ = document.querySelector.bind(document);

      $('.form').addEventListener('submit', controller.adiciona.bind(controller));

      $('#botao-apaga').addEventListener('click', controller.apaga.bind(controller));

      // associando o evento à chamada do método
      $('#botao-importa').addEventListener('click', controller.importaNegociacoes.bind(controller));
    }
  };
});
//# sourceMappingURL=app.js.map