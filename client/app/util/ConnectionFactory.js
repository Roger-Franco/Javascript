const ConnectionFactory = (function () {

  const stores = ['negociacoes'];

  let connection = null;
  // RETORNA A DEFINIÇÃO DA CLASSE
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
          // SÓ SERÁ EXECUTADO NA PRIMEIRA VEZ QUE A CONEXÃO FOR CRIADA
          connection = e.target.result;
          resolve(e.target.result);
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
  }
})()
// tmp(); // chama a função!
// A VARIÁVEL VIVE NO ESCOPO GLOBAL
// PORQUE FOI DECLARADA FORA DA FUNÇÃO
// const ConnectionFactory = tmp();