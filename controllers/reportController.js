const prisma = require('../configs/client');

async function getMonthlyReport(req, res) {
  const { month, year } = req.query;

  // Validate request query
  if (typeof month !== 'string' || typeof year !== 'string' || isNaN(parseInt(month)) || isNaN(parseInt(year))) {
    return res.status(400).json({ message: 'Month and year must be valid numbers' });
  }

  if (parseInt(month) < 1 || parseInt(month) > 12) {
    return res.status(400).json({ message: 'Month must be between 1 and 12' });
  }

  try {
    const startDate = new Date(`${year}-${month}-01`);
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + 1);

    const transactions = await prisma.transaction.findMany({
      where: {
        userId: req.user.userID,
        date: {
          gte: startDate,
          lt: endDate,
        },
      },
    });

    const totalIncome = transactions.filter(t => t.type === 'Income').reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = transactions.filter(t => t.type === 'Expense').reduce((sum, t) => sum + t.amount, 0);
    const balance = totalIncome - totalExpense;

    res.json({ totalIncome, totalExpense, balance });
  } catch (err) {
    console.error('Error fetching monthly report:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  getMonthlyReport,
};
