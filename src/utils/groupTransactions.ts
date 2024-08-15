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
  sum: number;
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
      sum: grouped[key].reduce((sum, groupItem) => {
        return sum + groupItem.amount;
      }, 0),
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
  const difference =
    ((thisMonthIncome - lastMonthIncome) / lastMonthIncome) * 100;
  return Math.round(difference);
}

export const groupedTransactionsData: GroupedTransaction[] = [
  {
    year: 2024,
    month: 1,
    transactions: [
      {
        id: 1,
        amount: 25000,
        createdAt: "2024-01-05",
        userId: 101,
        rentalId: 201,
      },
      {
        id: 2,
        amount: 30000,
        createdAt: "2024-01-20",
        userId: 102,
        rentalId: 202,
      },
    ],
    sum: 55000,
  },
  {
    year: 2024,
    month: 2,
    transactions: [
      {
        id: 3,
        amount: 22000,
        createdAt: "2024-02-10",
        userId: 103,
        rentalId: 203,
      },
      {
        id: 4,
        amount: 35000,
        createdAt: "2024-02-25",
        userId: 104,
        rentalId: 204,
      },
    ],
    sum: 57000,
  },
  {
    year: 2024,
    month: 3,
    transactions: [
      {
        id: 5,
        amount: 27000,
        createdAt: "2024-03-08",
        userId: 105,
        rentalId: 205,
      },
      {
        id: 6,
        amount: 33000,
        createdAt: "2024-03-18",
        userId: 106,
        rentalId: 206,
      },
    ],
    sum: 60000,
  },
  {
    year: 2024,
    month: 4,
    transactions: [
      {
        id: 7,
        amount: 29000,
        createdAt: "2024-04-05",
        userId: 107,
        rentalId: 207,
      },
      {
        id: 8,
        amount: 31000,
        createdAt: "2024-04-22",
        userId: 108,
        rentalId: 208,
      },
    ],
    sum: 60000,
  },
  {
    year: 2024,
    month: 5,
    transactions: [
      {
        id: 9,
        amount: 24000,
        createdAt: "2024-05-01",
        userId: 109,
        rentalId: 209,
      },
      {
        id: 10,
        amount: 32000,
        createdAt: "2024-05-15",
        userId: 110,
        rentalId: 210,
      },
    ],
    sum: 56000,
  },
  {
    year: 2024,
    month: 6,
    transactions: [
      {
        id: 11,
        amount: 26000,
        createdAt: "2024-06-07",
        userId: 111,
        rentalId: 211,
      },
      {
        id: 12,
        amount: 34000,
        createdAt: "2024-06-20",
        userId: 112,
        rentalId: 212,
      },
    ],
    sum: 60000,
  },
  {
    year: 2024,
    month: 7,
    transactions: [
      {
        id: 13,
        amount: 23000,
        createdAt: "2024-07-10",
        userId: 113,
        rentalId: 213,
      },
      {
        id: 14,
        amount: 36000,
        createdAt: "2024-07-25",
        userId: 114,
        rentalId: 214,
      },
    ],
    sum: 59000,
  },
  {
    year: 2024,
    month: 8,
    transactions: [
      {
        id: 15,
        amount: 25000,
        createdAt: "2024-08-05",
        userId: 115,
        rentalId: 215,
      },
      {
        id: 16,
        amount: 37000,
        createdAt: "2024-08-18",
        userId: 116,
        rentalId: 216,
      },
    ],
    sum: 62000,
  },
  {
    year: 2024,
    month: 9,
    transactions: [
      {
        id: 17,
        amount: 28000,
        createdAt: "2024-09-07",
        userId: 117,
        rentalId: 217,
      },
      {
        id: 18,
        amount: 34000,
        createdAt: "2024-09-22",
        userId: 118,
        rentalId: 218,
      },
    ],
    sum: 62000,
  },
  {
    year: 2024,
    month: 10,
    transactions: [
      {
        id: 19,
        amount: 29000,
        createdAt: "2024-10-05",
        userId: 119,
        rentalId: 219,
      },
      {
        id: 20,
        amount: 35000,
        createdAt: "2024-10-20",
        userId: 120,
        rentalId: 220,
      },
    ],
    sum: 64000,
  },
  {
    year: 2024,
    month: 11,
    transactions: [
      {
        id: 21,
        amount: 30000,
        createdAt: "2024-11-12",
        userId: 121,
        rentalId: 221,
      },
      {
        id: 22,
        amount: 32000,
        createdAt: "2024-11-25",
        userId: 122,
        rentalId: 222,
      },
    ],
    sum: 62000,
  },
  {
    year: 2024,
    month: 12,
    transactions: [
      {
        id: 23,
        amount: 33000,
        createdAt: "2024-12-05",
        userId: 123,
        rentalId: 223,
      },
      {
        id: 24,
        amount: 34000,
        createdAt: "2024-12-18",
        userId: 124,
        rentalId: 224,
      },
    ],
    sum: 67000,
  },
];
