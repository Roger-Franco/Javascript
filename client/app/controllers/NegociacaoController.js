
class NegociacaoController {
  constructor() {
    let $ = document.querySelector.bind(document);
    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');
    this._negociacoes = new Negociacoes();
    // passamos para o construtor o seletor CSS de ID
    this._negociacoesView = new NegociacoesView('#negociacoes');
    // atualizando a view
    this._negociacoesView.update(this._negociacoes);
    // instanciando o modelo!
    this._mensagem = new Mensagem();

  }
  adiciona(event) {
    event.preventDefault();
    this._negociacoes.adiciona(this._criaNegociacao())
    this._mensagem.texto = 'Negociação adicionada com sucesso';
    this._negociacoesView.update(this._negociacoes);
    this._limpaFormulario();
  }
  _limpaFormulario() {
    this._inputData.value = '';
    this._inputQuantidade.value = 1;
    this._inputValor.value = 0.0
    this._inputData.focus();
  }
  _criaNegociacao() {
    // retorna uma instância de negociação
    return new Negociacao(
      DateConverter.paraData(this._inputData.value),
      parseInt(this._inputQuantidade.value),
      parseFloat(this._inputValor.value),
    );
  }
}