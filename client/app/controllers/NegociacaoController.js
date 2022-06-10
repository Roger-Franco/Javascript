
class NegociacaoController {
  constructor() {
    let $ = document.querySelector.bind(document); // precisei adicionar o .bind(document);

    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');
  }
  adiciona(event) {
    event.preventDefault();
    // precisamos acessar as propriedades através de this
    console.log(this._inputData.value);
    console.log(parseInt(this._inputQuantidade.value));
    console.log(parseFloat(this._inputValor.value));
  }
}