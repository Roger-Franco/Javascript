export function debounce(fn, milissegundos) {
  // guarda o ID de um timer, 0 indica que não há nenhum
  let timer = 0;
  return () => {
    // para o último timer definido
    clearTimeout(timer);

    // usa um temporizador para chamar fn()
    // depois de tantos milissegundos

    // a variável timer ganha o ID de um novo temporizador
    // afeta a variável no escopo da função debounce
    timer = setTimeout(() => fn(), milissegundos);

  }
}