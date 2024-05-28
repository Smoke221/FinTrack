const prisma = require("../configs/client");

// Get all budgets for the authenticated user
async function getBudgets(req, res) {
  try {
    const budgets = await prisma.budget.findMany({
      where: { userId: req.user.userID },
    });
    res.status(200).json(budgets);
  } catch (err) {
    console.error("Error fetching budgets:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Create a new budget
async function createBudget(req, res) {
  const { amount, month, year } = req.body;

  // Validate request body
  if (typeof amount !== "number" || amount <= 0) {
    return res
      .status(400)
      .json({ message: "Amount must be a positive number" });
  }
  if (typeof month !== "number" || month < 1 || month > 12) {
    return res.status(400).json({ message: "Month must be between 1 and 12" });
  }
  if (typeof year !== "number" || year < 2000 || year > 3000) {
    return res
      .status(400)
      .json({ message: "Year must be between 2000 and 3000" });
  }

  try {
    const existingMonthBudget = await prisma.budget.findFirst({
      where: {
        month: month,
        year: year,
        userId: req.user.userID,
      },
    });

    if (existingMonthBudget) {
      return res.status(409).json({
        message:
          "Budget for this month already exists. You can update the existing one.",
      });
    }

    const budget = await prisma.budget.create({
      data: {
        amount,
        month,
        year,
        userId: req.user.userID,
      },
    });
    res.status(201).json({ message: "Budget created successfully", budget });
  } catch (err) {
    console.error("Error creating budget:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Update an existing budget
async function updateBudget(req, res) {
  const { id } = req.params;
  const { amount, month, year } = req.body;

  // Validate request body
  if (typeof amount !== "number" || amount <= 0) {
    return res
      .status(400)
      .json({ message: "Amount must be a positive number" });
  }
  if (typeof month !== "number" || month < 1 || month > 12) {
    return res.status(400).json({ message: "Month must be between 1 and 12" });
  }
  if (typeof year !== "number" || year < 2000 || year > 3000) {
    return res
      .status(400)
      .json({ message: "Year must be between 2000 and 3000" });
  }

  try {
    // Check if the budget exists
    const existingBudget = await prisma.budget.findUnique({
      where: { id: Number(id) },
    });

    if (!existingBudget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    // Check if the budget belongs to the authenticated user
    if (existingBudget.userId !== req.user.userID) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this budget" });
    }

    const budget = await prisma.budget.update({
      where: { id: Number(id) },
      data: { amount, month, year },
    });
    res.status(200).json({ message: "Budget updated successfully", budget });
  } catch (err) {
    console.error("Error updating budget:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Delete an existing budget
async function deleteBudget(req, res) {
  const { id } = req.params;

  try {
    // Check if the budget exists
    const existingBudget = await prisma.budget.findUnique({
      where: { id: Number(id) },
    });

    if (!existingBudget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    // Check if the budget belongs to the authenticated user
    if (existingBudget.userId !== req.user.userID) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this budget" });
    }

    await prisma.budget.delete({ where: { id: Number(id) } });
    res.status(200).json({ message: "Budget deleted successfully" });
  } catch (err) {
    console.error("Error deleting budget:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  getBudgets,
  createBudget,
  updateBudget,
  deleteBudget,
};
