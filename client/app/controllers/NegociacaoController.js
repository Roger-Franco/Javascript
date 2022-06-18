
class NegociacaoController {
  constructor() {
    // não vamos atribuir outor valor à variável
    const $ = document.querySelector.bind(document);
    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');

    // criando o proxy com auxílio da nossa fábrica!
    this._negociacoes = ProxyFactory.create(
      new Negociacoes(),
      ['adiciona', 'esvazia'],
      model => this._negociacoesView.update(model));

    // passamos para o construtor o seletor CSS de ID
    this._negociacoesView = new NegociacoesView('#negociacoes');
    // atualizando a view
    this._negociacoesView.update(this._negociacoes);
    // criando o proxy com auxílio da nossa fábrica!
    this._mensagem = ProxyFactory.create(
      new Mensagem(),
      ['texto'],
      model => this._mensagemView.update(model));

    // nova propriedade!
    this._mensagemView = new MensagemView('#mensagemView');
    this._mensagemView.update(this._mensagem);
  }

  adiciona(event) {
    event.preventDefault();
    this._negociacoes.adiciona(this._criaNegociacao())
    this._mensagem.texto = 'Negociação adicionada com sucesso';
    // não chama mais o update da view de Mensagem
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

  apaga() {
    this._negociacoes.esvazia();
    this._mensagem.texto = 'Negociações apagadas com sucesso';
    // não chama mais o update da view de Mensagem
  }
}