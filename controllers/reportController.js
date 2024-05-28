const prisma = require('../configs/client');

async function getMonthlyReport(req, res) {
  const { month, year } = req.query;
  const transactions = await prisma.transaction.findMany({
    where: {
      userId: req.user.userID,
      date: {
        gte: new Date(`${year}-${month}-01`),
        lt: new Date(`${year}-${parseInt(month) + 1}-01`),
      },
    },
  });

  console.log(
    new Date(`${year}-(${parseInt(month) + 1})-01`)
  );
  
  const totalIncome = transactions.filter(t => t.type === 'Income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'Expense').reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpense;

  res.json({ totalIncome, totalExpense, balance });
}

module.exports = {
  getMonthlyReport,
};
