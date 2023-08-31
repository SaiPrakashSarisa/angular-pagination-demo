const { addNewExpence, addNewIncome, getAllExpences } = require("./mongo");

const expences = async (req, res) => {
  //   console.log(req.body, "expences reqbody");
  try {
    let result = await addNewExpence(req.body);
    res.send({
      statusCode: result.status,
      body: JSON.stringify(result.data),
    });
  } catch (error) {
    res.send({
      statusCode: error.status,
      body: JSON.stringify(error.error),
    });
  }
};

const incomes = async (req, res) => {};
const allExpences = async (req, res) => {
  try {
    result = await getAllExpences();
    res.send({
      statusCode: result.status,
      body: JSON.stringify(result.data),
    });
  } catch (error) {
    res.send({
      statusCode: error.status,
      body: JSON.stringify(error.error),
    });
  }
};

module.exports = { expences, incomes, allExpences };
