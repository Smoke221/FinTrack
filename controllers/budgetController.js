const prisma = require('../configs/client');

async function getBudgets(req, res) {
  const budgets = await prisma.budget.findMany({
    where: { userId: req.user.userID },
  });
  res.json(budgets);
}

async function createBudget(req, res) {
  const { amount, month, year } = req.body;
  const budget = await prisma.budget.create({
    data: {
      amount,
      month,
      year,
      userId: req.user.userID,
    },
  });
  res.json(budget);
}

async function updateBudget(req, res) {
  const { id } = req.params;
  const { amount, month, year } = req.body;
  const budget = await prisma.budget.update({
    where: { id: Number(id) },
    data: { amount, month, year },
  });
  res.json(budget);
}

async function deleteBudget(req, res) {
  const { id } = req.params;
  await prisma.budget.delete({ where: { id: Number(id) } });
  res.json({ message: 'Budget deleted' });
}

module.exports = {
  getBudgets,
  createBudget,
  updateBudget,
  deleteBudget,
};
