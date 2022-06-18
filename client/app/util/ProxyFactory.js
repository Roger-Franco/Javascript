class ProxyFactory {
  static create(objeto, props, armadilha) {
    return new Proxy(objeto, {
      get(target, prop, receiver) {
        // usa o array props para realizar o includes
        if (typeof (target[prop]) == typeof (Function) && props.includes(prop)) {
          return function () {
            console.log(`"${prop}" disparou a armadilha`);
            target[prop].apply(target, arguments);
            // executa a armadilha que recebe
            // o objeto original
            armadilha(target);
          }
        } else {
          return target[prop];
        }
      }
    });
  }
}