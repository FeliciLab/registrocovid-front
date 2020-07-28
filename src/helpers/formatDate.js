const formatDate = (value) => {
  const date = new Date(value);
  return Intl.DateTimeFormat('en-GB').format(date);
};

export default formatDate;
