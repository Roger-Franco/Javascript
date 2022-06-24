
class NegociacaoController {
  constructor() {
    // não vamos atribuir outor valor à variável
    const $ = document.querySelector.bind(document);
    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');

    // não passamos mais "adiciona" e "esvazia" dentro de um array
    this._negociacoes = new Bind(
      new Negociacoes(),
      new NegociacoesView('#negociacoes'),
      'adiciona', 'esvazia'
    );
    // não passamos mais "texto" dentro de um array
    this._mensagem = new Bind(
      new Mensagem(),
      new MensagemView('#mensagemView'),
      'texto'
    );

    this._service = new NegociacaoService();

    // chama o método de inicialização
    this._init();
  }

  _init() {
    getNegociacaoDao()
      .then(dao => dao.listaTodos())
      .then(negociacoes =>
        negociacoes.forEach(negociacao =>
          this._negociacoes.adiciona(negociacao)))
      .catch(err => this._mensagem.texto = err);
  }

  adiciona(event) {
    try {
      event.preventDefault();
      // negociação que precisamos incluir no banco e na tabela
      const negociacao = this._criaNegociacao();
      getNegociacaoDao()
        .then(dao => dao.adiciona(negociacao))
        .then(() => {
          // só tentará incluir na tabela se conseguiu antes incluir no banco
          this._negociacoes.adiciona(negociacao)
          this._mensagem.texto = 'Negociação adicionada com sucesso';
          this._limpaFormulario();
        })
        .catch(err => this._mensagem.texto = err);
    } catch (err) {
      console.log(err);
      console.log(err.stack);
      // TESTA SE O TIPO DO ERRO É DE DATA,
      // SE FOR, EXIBE MENSAGEM PARA O USUÁRIO
      if (err instanceof DataInvalidaException) {
        this._mensagem.texto = err.message;
      } else {
        // mensagem genérica para qualquer problema que possa acontecer  
        this._mensagem.texto = 'Um erro não esperado aconteceu. Entre em contato com o suporte';
      }
    }

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
    getNegociacaoDao()
      .then(dao => dao.apagaTodos())
      .then(() => {
        this._negociacoes.esvazia();
        this._mensagem.texto = 'Negociações apagadas com sucesso';
      })
      .catch(err => this._mensagem.texto = err);
  }

  importaNegociacoes() {
    this._service
      .obterNegociacoesDoPeriodo()
      .then(negociacoes => {
        // periodo ainda é um array com 3 elementos que são arrays
        negociacoes
          .filter(novaNegociacao => !this._negociacoes.paraArray().some(negociacaoExistente =>
            novaNegociacao.equals(negociacaoExistente)))
          .forEach(negociacao => this._negociacoes.adiciona(negociacao));
        this._mensagem.texto = 'Negociações do período importadas com sucesso';
      })
      .catch(err => this._mensagem.texto = err);
  }

}
