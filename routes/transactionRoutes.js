const express = require("express");
const {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");

const tRouter = express.Router();

tRouter.get("/", getTransactions);
tRouter.post("/", createTransaction);
tRouter.put("/:id", updateTransaction);
tRouter.delete("/:id", deleteTransaction);

module.exports = { tRouter };
