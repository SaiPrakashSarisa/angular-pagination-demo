const { Double } = require("mongodb");
const mongoose = require("mongoose");

const expensesSchema = mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    categorie: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports.ExpensesSchema = mongoose.model("expensesData", expensesSchema);
