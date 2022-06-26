import { DataInvalidaException } from './DataInvalidaException.js';

export class DateConverter {
  // As linhas abaixos são apenas para avisar que essa classe nao pode ser instanciada. O motivo 
  // é que a classe DateConverter tem métodos estáticos, o que torna desnecessária a criação de 
  // uma instância.
  constructor() {
    throw new Error('Esta classe não pode ser instanciada');
  }
  static paraTexto(data) {
    return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
  }
  static paraData(texto) {
    if (!/\d{2}\/\d{2}\/\d{4}/.test(texto))
      throw new DataInvalidaException();
    return new Date(...texto.split('/')
      .reverse().map((item, indice) => item - indice % 2))
  }
}