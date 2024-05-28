const express = require("express");
const {
  getBudgets,
  createBudget,
  updateBudget,
  deleteBudget,
} = require("../controllers/budgetController");

const bRouter = express.Router();

bRouter.get("/", getBudgets);
bRouter.post("/", createBudget);
bRouter.put("/:id", updateBudget);
bRouter.delete("/:id", deleteBudget);

module.exports = { bRouter };
