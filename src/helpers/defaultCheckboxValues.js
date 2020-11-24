export default (lista, old, name, setFieldValue) => {
  const listaIds = lista.map(item => item.id).sort((a, b) => b - a)
  let novaLista = [];
  for (let i = 0; i <= listaIds[0]; i++) {
    if (!old[i]) {
      novaLista.push(false)
      continue
    }
    novaLista.push(old[i])
  }

  setFieldValue(name, [...novaLista])
}
