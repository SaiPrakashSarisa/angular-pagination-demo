const { expences, incomes, allExpences } = require("./controllers");

module.exports = function (app, router) {
  app.route("/user/expences").post(expences);
  app.route("/user/incomes").post();
  app.route("/user/allExpences").get(allExpences);
};
