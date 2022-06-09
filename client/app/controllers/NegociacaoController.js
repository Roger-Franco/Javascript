
class NegociacaoController {
  adiciona(event) {
    // cancelando a submissão do formulário
    event.preventDefault();
    // buscando os elementos
    // let inputData = document.querySelector('#data');
    // let inputQuantidade = document.querySelector('#quantidade');
    // let inputValor = document.querySelector('#valor');

    // a ideia é que $ seja o querySelector
    let $ = document.querySelector.bind(document); // precisei adicionar o .bind(document);

    let inputData = $('#data');
    let inputQuantidade = $('#quantidade');
    let inputValor = $('#valor');


    console.log(inputData.value);
    console.log(inputQuantidade.value);
    console.log(parseInt(inputQuantidade.value));
    console.log(parseFloat(inputValor.value));


  }
}