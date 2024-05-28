const prisma = require("../configs/client");

// Get all transactions for the authenticated user
async function getTransactions(req, res) {
  try {
    const transactions = await prisma.transaction.findMany({
      where: { userId: req.user.userID },
      include: { category: true },
    });
    res.status(200).json(transactions);
  } catch (err) {
    console.error("Error fetching transactions:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Create a new transaction
async function createTransaction(req, res) {
  const { amount, type, categoryId } = req.body;

  // Validate request body
  if (typeof amount !== "number" || amount <= 0) {
    return res
      .status(400)
      .json({ message: "Amount must be a positive number" });
  }

  if (type !== "Income" && type !== "Expense") {
    return res
      .status(400)
      .json({ message: 'Type must be either "Income" or "Expense"' });
  }

  try {
    const transaction = await prisma.transaction.create({
      data: {
        amount,
        type,
        userId: req.user.userID,
        categoryId,
      },
    });
    res.status(201).json(transaction);
  } catch (err) {
    console.error("Error creating transaction:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Update an existing transaction
async function updateTransaction(req, res) {
  const { id } = req.params;
  const { amount, type, categoryId } = req.body;

  // Validate request body
  if (typeof amount !== "number" || amount <= 0) {
    return res
      .status(400)
      .json({ message: "Amount must be a positive number" });
  }

  if (type !== "Income" && type !== "Expense") {
    return res
      .status(400)
      .json({ message: 'Type must be either "Income" or "Expense"' });
  }

  try {
    // Check if the transaction exists
    const existingTransaction = await prisma.transaction.findUnique({
      where: { id: Number(id) },
    });

    if (!existingTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // Check if the transaction belongs to the authenticated user
    if (existingTransaction.userId !== req.user.userID) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this transaction" });
    }

    const transaction = await prisma.transaction.update({
      where: { id: Number(id) },
      data: {
        amount,
        type,
        categoryId
      },
    });
    res.status(201).json(transaction);
  } catch (err) {
    console.error("Error updating transaction:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Delete an existing transaction
async function deleteTransaction(req, res) {
  const { id } = req.params;

  try {
    // Check if the transaction exists
    const existingTransaction = await prisma.transaction.findUnique({
      where: { id: Number(id) },
    });

    if (!existingTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // Check if the transaction belongs to the authenticated user
    if (existingTransaction.userId !== req.user.userID) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this transaction" });
    }

    await prisma.transaction.delete({ where: { id: Number(id) } });
    res.status(204).json({ message: "Transaction deleted" });
  } catch (err) {
    console.error("Error deleting transaction:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
