function getDataUltimoDesfecho(desfechos) {
  if (!desfechos) return '';

  const datas = desfechos.map(desfecho => desfecho.data);

  return datas.sort(
    (a, b) => Number(b.split('-').join('')) - Number(a.split('-').join('')),
  )[0];
}

export default getDataUltimoDesfecho;
