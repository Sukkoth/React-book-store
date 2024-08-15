type Transaction = {
  id: number;
  amount: number;
  createdAt: string;
  userId: number;
  rentalId: number;
};

type GroupedTransaction = {
  year: number;
  month: number;
  transactions: Transaction[];
};

export function groupAndSortTransactions(
  transactions: Transaction[]
): GroupedTransaction[] {
  // Helper function to extract year and month from date
  const getYearMonth = (date: string): { year: number; month: number } => {
    const d = new Date(date);
    return { year: d.getFullYear(), month: d.getMonth() + 1 }; // Months are 0-based
  };

  // Group transactions by year and month
  const grouped: { [key: string]: Transaction[] } = {};

  transactions.forEach((transaction) => {
    const { year, month } = getYearMonth(transaction.createdAt);
    const key = `${year}-${month.toString().padStart(2, "0")}`; // Format as "YYYY-MM"

    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(transaction);
  });

  // Convert grouped data to array of objects
  const result: GroupedTransaction[] = Object.keys(grouped).map((key) => {
    const [year, month] = key.split("-").map(Number);
    return {
      year,
      month,
      transactions: grouped[key],
    };
  });

  // Sort by year and month in descending order
  result.sort((a, b) => {
    if (a.year !== b.year) {
      return b.year - a.year; // Descending order of years
    }
    return b.month - a.month; // Descending order of months
  });

  return result;
}

export function getTotalAmountForPeriod(
  year: number,
  month: number,
  groupedTransactions: GroupedTransaction[]
): number {
  // Find the group matching the given year and month
  const group = groupedTransactions.find(
    (item) => item.year === year && item.month === month
  );

  // If the group is found, sum the amounts; otherwise, return 0
  if (group) {
    return group.transactions.reduce(
      (total, transaction) => total + transaction.amount,
      0
    );
  } else {
    return 0;
  }
}

export function calculatePercentageChange(
  lastMonthIncome: number,
  thisMonthIncome: number
): number {
  if (lastMonthIncome === 0) {
    if (thisMonthIncome === 0) {
      return 0; // No change if both incomes are zero
    }
    return thisMonthIncome > 0 ? 100 : -100; // 100% increase if last month was zero and this month is positive, -100% decrease if last month was zero and this month is negative
  }

  // Calculate percentage change
  return ((thisMonthIncome - lastMonthIncome) / lastMonthIncome) * 100;
}
