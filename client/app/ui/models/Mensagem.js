System.register([], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      class Mensagem {
        constructor(texto = '') {
          // if(!texto) {
          //   texto = '';
          // } ou podemos usar o || abaixo: 
          // this._texto = texto || '';
          this._texto = texto; // mas vamos escolher passar no parâmetro do constructor um parâmetro default;
        }
        get texto() {
          return this._texto;
        }
        set texto(texto) {
          this._texto = texto;
        }
      }

      _export('Mensagem', Mensagem);
    }
  };
});
//# sourceMappingURL=Mensagem.js.map