
class NegociacaoController {
  constructor() {
    let $ = document.querySelector.bind(document); // precisei adicionar o .bind(document);

    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');
  }
  adiciona(event) {
    event.preventDefault();

    let data = new Date(...this._inputData.value.split('-')
      // .map(function (item, indice) {
      //   // lembre-se de que arrays começam com índice 0,
      //   // logo, 1 é o segundo elemento!
      //   if (indice === 1) {
      //     return item - 1
      //   }
      //   return item
      // })
      .map(function (item, indice) {
        return item - indice % 2; // essa forma com menos código
      })
    );
    console.log(data);
  }
}