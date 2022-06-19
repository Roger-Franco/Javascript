
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

  }

  adiciona(event) {
    try {
      event.preventDefault();
      this._negociacoes.adiciona(this._criaNegociacao())
      this._mensagem.texto = 'Negociação adicionada com sucesso';
      // não chama mais o update da view de Mensagem
      this._limpaFormulario();
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
    this._negociacoes.esvazia();
    this._mensagem.texto = 'Negociações apagadas com sucesso';
    // não chama mais o update da view de Mensagem
  }

  importaNegociacoes() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'negociacoes/semana');

    xhr.onreadystatechange = () => {
      // 0: requisição ainda não iniciada;
      // 1: conexão com o servidor estabelecida;
      // 2: requisição recebida;
      //  3: processando requisição;
      //  4: requisição está concluída e a resposta está pronta.
      // OBS: Por esse motivo tem que ser igual a 4
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          console.log('Obtendo as negociações do servidor.');
        } else {
          console.log('Não foi possível obter as negociações da semana.');
        }
      }
    }
    xhr.send(); // executa a requisição configurada
  }
}