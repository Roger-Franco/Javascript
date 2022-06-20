class NegociacaoService {

  constructor() {
    // NOVA PROPRIEDADE!
    this._http = new HttpService();
  }

  obterNegociacoesDaSemana() {
    return this._http
      .get('negociacoes/semana')
      .then(
        dados => {
          const negociacoes = dados.map(objeto =>
            new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
          return negociacoes;
        },
        err => {
          // ATENÇÃO AQUI!
          throw new Error('Não foi possível obter as negociações');

        }
      )
  }

  obterNegociacoesDaSemanaAnterior() {
    return this._http
      .get('negociacoes/anterior')
      .then(
        dados => {
          const negociacoes = dados.map(objeto =>
            new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
          return negociacoes;
        },
        err => {
          // ATENÇÃO AQUI!
          throw new Error('Não foi possível obter as negociações da semana anterior');

        }
      )
  }

  obterNegociacoesDaSemanaRetrasada() {
    return this._http
      .get('negociacoes/retrasada')
      .then(
        dados => {
          const negociacoes = dados.map(objeto =>
            new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
          return negociacoes;
        },
        err => {
          // ATENÇÃO AQUI!
          throw new Error('Não foi possível obter as negociações da semana retrasada');

        }
      )
  }

  obterNegociacoesDoPeriodo() {
    return Promise.all([
      this.obterNegociacoesDaSemana(),
      this.obterNegociacoesDaSemanaAnterior(),
      this.obterNegociacoesDaSemanaRetrasada()
    ])
      .then(periodo => {
        // NÃO FAZ MAIS O FOREACH
        return periodo
          .reduce((novoArray, item) => novoArray.concat(item), [])

      })
      .catch(err => {
        console.log(err);

        throw new Error('Não foi possível obter as negociações do período')
      });
  }
}
