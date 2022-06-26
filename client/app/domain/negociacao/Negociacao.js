System.register([], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      class Negociacao {
        constructor(_data, _quantidade, _valor) {
          // criando uma nova data, uma nova referência
          Object.assign(this, { _quantidade, _valor });
          this._data = new Date(_data.getTime());
          Object.freeze(this);
        }

        get volume() {
          return this._quantidade * this._valor;
        }

        get data() {
          return new Date(this._data.getTime());
        }

        get quantidade() {
          return this._quantidade;
        }
        get valor() {
          return this._valor;
        }

        equals(negociacao) {
          // return this.data.getDate() == negociacao.data.getDate()
          //   && this.data.getMonth() == negociacao.data.getMonth()
          //   && this.data.getFullYear() == negociacao.data.getFullYear()
          //   && this.quantidade == negociacao.quantidade
          //   && this.valor == negociacao.valor;
          // Ou podemos usar esse truque:
          return JSON.stringify(this) == JSON.stringify(negociacao);
        }
      }

      _export("Negociacao", Negociacao);
    }
  };
});
//# sourceMappingURL=Negociacao.js.map