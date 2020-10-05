const formatDate = value => {
  const parts = value.match(/(\d+)/g);
  const date = new Date(parts[0], parts[1] - 1, parts[2]);
  return Intl.DateTimeFormat('en-GB').format(date);
};

export default formatDate;
