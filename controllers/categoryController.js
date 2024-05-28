const prisma = require("../configs/client");

async function getCategories(req, res) {
  const categories = await prisma.category.findMany();
  res.json(categories);
}

async function createCategory(req, res) {
  const { name } = req.body;
  const category = await prisma.category.create({
    data: { name },
  });
  res.json(category);
}

async function updateCategory(req, res) {
  const { id } = req.params;
  const { name } = req.body;
  const category = await prisma.category.update({
    where: { id: Number(id) },
    data: { name },
  });
  res.json(category);
}

async function deleteCategory(req, res) {
  const { id } = req.params;
  await prisma.category.delete({ where: { id: Number(id) } });
  res.json({ message: "Category deleted" });
}

async function getExpensesByCategory(req, res) {
  try {
    const { id } = req.params;
    const expenses = await prisma.transaction.findMany({
      where: {
        categoryId: Number(id),
        userId: req.user.userID,
      },
      include: { category: true },
    });
    res.json(expenses);
  } catch (err) {
    console.error("Error fetching expenses by category:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getTotalExpensesByCategory(req, res) {
  try {
    const { id } = req.params;
    const totalExpenses = await prisma.transaction.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        categoryId: Number(id),
        userId: req.user.userID,
        type: "Expense",
      },
    });
    res.json({ total: totalExpenses._sum.amount });
  } catch (err) {
    console.error("Error fetching total expenses by category:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getExpensesByCategory,
  getTotalExpensesByCategory
};
