const { getDate } = require("./utils/date");
const { MongoClient } = require("mongodb");
const { ExpensesSchema } = require("./schema");
const mongoose = require("mongoose");
require("dotenv").config();

const dbName = "expences";

mongoose
  .connect(process.env.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

    dbName: dbName,
  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.error("MongoDB connection error :", error);
  });

async function addNewExpence(expence) {
  console.log(expence.expense, "is expence");

  try {
    let expense = new ExpensesSchema({
      date: getDate(),
      amount: expence.expense.amount,
      categorie: expence.expense.category?.name,
      type: expence.expense.type,
      desc: expence.expense.description,
    });
    console.log(expense, "is expense");
    await expense.save();
    return {
      status: 200,
      data: { sucess: true, message: "Expence Added successfully" },
    };
  } catch (error) {
    console.log("add New expence in catch: ", errro);
    throw {
      status: 500,
      error: {
        success: false,
        message: "unable to insert data",
        error: error,
      },
    };
  }
}

const getAllExpences = async (
  skip = 0,
  limit = 100,
  category = "",
  month = "",
  year = ""
) => {
  console.log("expences here", skip, limit, category, month, year);
  let response = "";
  try {
    response = await ExpensesSchema.find(
      {},
      { updatedAt: 0, __v: 0, createdAt: 0 }
    );
    console.log(response);
    return { status: 200, data: { success: true, data: response } };
  } catch (error) {
    throw {
      status: 500,
      error: { success: false, message: "unable to fetch data", error: error },
    };
  }
};

module.exports = { addNewExpence, getAllExpences };
