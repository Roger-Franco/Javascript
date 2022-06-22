const stores = ['negociacoes'];

class ConnectionFactory {
  constructor() {
    throw new Error('Não é possível criar instâncias dessa classe');
  }
  static getConnection() {
    return new Promise((resolve, reject) => {
      const openRequest = indexedDB.open('jscangaceiro', 2);
      openRequest.onupgradeneeded = e => {
        // PASSA A CONEXÃO PARA O MÉTODO
        ConnectionFactory._createStores(e.target.result);

      };
      openRequest.onsuccess = e => {
        // passa o resultado (conexão) para a promise!
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
