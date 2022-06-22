const ConnectionFactory = (() => {

  const stores = ['negociacoes'];

  let connection = null;

  // VARIÁVEL QUE ARMAZENARÁ A FUNÇÃO CLOSE ORIGINAL
  let close = null;
  return class ConnectionFactory {
    constructor() {
      throw new Error('Não é possível criar instâncias dessa classe');
    }
    static getConnection() {
      return new Promise((resolve, reject) => {
        // SE UMA CONEXÃO JÁ FOI CRIADA,
        // JÁ PASSA PARA RESOLVE E RETORNA LOGO!
        if (connection) return resolve(connection);
        const openRequest = indexedDB.open('jscangaceiro', 2);
        openRequest.onupgradeneeded = e => {
          ConnectionFactory._createStores(e.target.result);

        };
        openRequest.onsuccess = e => {
          connection = e.target.result;
          // GUARDANDO A FUNÇÃO ORIGINAL!
          close = connection.close.bind(connection);
          connection.close = () => {
            throw new Error('Você não pode fechar diretamente a conexão');
          }
          resolve(connection);
        };
        openRequest.onerror = e => {
          console.log(e.target.error)
          // passa o erro para reject da promise!
          reject(e.target.error.name)
        };
      });
    }

    static _createStores(connection) {
      stores.forEach(store => {
        // if sem bloco, mais sucinto!
        if (connection.objectStoreNames.contains(store))
          connection.deleteObjectStore(store);

        connection.createObjectStore(store, { autoIncrement: true });
      });
    }

    static closeConnection() {
      if (connection) {
        // connection.close();
        // CHAMANDO O CLOSE ORIGINAL!
        close();

      }
    }
  }
})()
// tmp(); // chama a função!
// A VARIÁVEL VIVE NO ESCOPO GLOBAL
// PORQUE FOI DECLARADA FORA DA FUNÇÃO
// const ConnectionFactory = tmp();