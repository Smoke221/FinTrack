const prisma = require("../configs/client");

// Get all categories
async function getCategories(req, res) {
  try {
    const categories = await prisma.category.findMany();
    res.status(200).json(categories);
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Create a new category
async function createCategory(req, res) {
  const { name } = req.body;

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({ message: 'Invalid category name' });
  }

  try {
    const category = await prisma.category.create({
      data: { name },
    });
    res.status(201).json({ message: 'Category created successfully', category });
  } catch (err) {
    console.error("Error creating category:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Update an existing category
async function updateCategory(req, res) {
  const { id } = req.params;
  const { name } = req.body;

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({ message: 'Invalid category name' });
  }

  try {
    // Check if the category exists
    const existingCategory = await prisma.category.findUnique({
      where: { id: Number(id) },
    });

    if (!existingCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const category = await prisma.category.update({
      where: { id: Number(id) },
      data: { name },
    });
    res.status(200).json({ message: 'Category updated successfully', category });
  } catch (err) {
    console.error("Error updating category:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Delete an existing category
async function deleteCategory(req, res) {
  const { id } = req.params;

  try {
    // Check if the category exists
    const existingCategory = await prisma.category.findUnique({
      where: { id: Number(id) },
    });

    if (!existingCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    await prisma.category.delete({ where: { id: Number(id) } });
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (err) {
    console.error("Error deleting category:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Get all expenses for a given category
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
    res.status(200).json(expenses);
  } catch (err) {
    console.error("Error fetching expenses by category:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Get the total amount of expenses for a given category
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

    const total = totalExpenses._sum.amount || 0;
    res.status(200).json({ total });
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
  getTotalExpensesByCategory,
};
