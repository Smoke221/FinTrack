const express = require("express");
const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getExpensesByCategory,
  getTotalExpensesByCategory,
} = require("../controllers/categoryController");

const cRouter = express.Router();

cRouter.get("/", getCategories);
cRouter.post("/", createCategory);
cRouter.put("/:id", updateCategory);
cRouter.delete("/:id", deleteCategory);
cRouter.get("/:id/expenses", getExpensesByCategory);
cRouter.get("/:id/expenses/total", getTotalExpensesByCategory);

module.exports = { cRouter };
