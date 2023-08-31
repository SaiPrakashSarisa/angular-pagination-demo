const getDate = () => {
  const date = new Date();

  const currentDate = date.getDate();
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();

  return currentDate + "/" + currentMonth + "/" + currentYear;
};

module.exports = { getDate };
