const prisma = require('../configs/client');

async function getTransactions(req, res) {
  const transactions = await prisma.transaction.findMany({
    where: { userId: req.user.userID },
    include: { category: true },
  });
  res.json(transactions);
}

async function createTransaction(req, res) {
  const { amount, type, categoryId } = req.body;
  const transaction = await prisma.transaction.create({
    data: {
      amount,
      type,
      userId: req.user.userID,
      categoryId,
    },
  });
  res.json(transaction);
}

async function updateTransaction(req, res) {
  const { id } = req.params;
  const { amount, type, categoryId } = req.body;
  const transaction = await prisma.transaction.update({
    where: { id: Number(id) },
    data: { amount, type, categoryId },
  });
  res.json(transaction);
}

async function deleteTransaction(req, res) {
  const { id } = req.params;
  await prisma.transaction.delete({ where: { id: Number(id) } });
  res.json({ message: 'Transaction deleted' });
}

module.exports = {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
