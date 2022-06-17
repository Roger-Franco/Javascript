
class NegociacaoController {
  constructor() {
    // não vamos atribuir outor valor à variável
    const $ = document.querySelector.bind(document);
    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');

    // guardando uma referência
    // para a instância de NegociacaoController
    const self = this;
    this._negociacoes = new Proxy(new Negociacoes(), {
      get(target, prop, receiver) {
        if (typeof (target[prop]) == typeof (Function) && ['adiciona', 'esvazia']
          .includes(prop)) {
          return function () {
            console.log(`"${prop}" disparou a armadilha`);
            target[prop].apply(target, arguments);
            // target é a instância real de Negociacoes
            // contudo, TEREMOS PROBLEMAS AQUI!
            // this._negociacoesView.update(target);
            // AGORA USA SELF!
            self._negociacoesView.update(target);

          }
        } else {
          return target[prop];
        }
      }
    });
    // passamos para o construtor o seletor CSS de ID
    this._negociacoesView = new NegociacoesView('#negociacoes');
    // atualizando a view
    this._negociacoesView.update(this._negociacoes);
    // instanciando o modelo!
    this._mensagem = new Mensagem();
    // nova propriedade!
    this._mensagemView = new MensagemView('#mensagemView');
    this._mensagemView.update(this._mensagem);
  }

  adiciona(event) {
    event.preventDefault();
    this._negociacoes.adiciona(this._criaNegociacao())
    this._mensagem.texto = 'Negociação adicionada com sucesso';
    // atualiza a view com o texto da mensagem que acabamos de atribuir
    this._mensagemView.update(this._mensagem);
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
    this._mensagemView.update(this._mensagem);
  }
}