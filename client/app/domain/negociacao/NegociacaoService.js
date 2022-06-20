class NegociacaoService {

  obterNegociacoesDaSemana() {
    return new Promise((resolve, reject) => {

      // 0: requisição ainda não iniciada;
      // 1: conexão com o servidor estabelecida;
      // 2: requisição recebida;
      //  3: processando requisição;
      //  4: requisição está concluída e a resposta está pronta.
      // OBS: Por esse motivo tem que ser igual a 4

      const xhr = new XMLHttpRequest();
      xhr.open('GET', 'negociacoes/semana');

      xhr.onreadystatechange = () => {

        if (xhr.readyState == 4) {

          if (xhr.status == 200) {

            const negociacoes = JSON
              .parse(xhr.responseText)
              .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
            // CHAMOU RESOLVE
            resolve(negociacoes);

          } else {
            // CHAMOU REJECT
            reject('Não foi possível obter nas negociações da semana');
          }
        }
      };

      xhr.send();
    })
  }
}