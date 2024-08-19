import { useAuth } from "@/Providers/AuthProvider";
import { WalletTransactions } from "@/Types/types";
import { groupAndSortTransactions } from "@/utils/groupTransactions";
import { LineChart } from "@mui/x-charts/LineChart";
import { useQueryClient } from "@tanstack/react-query";

export default function BasicArea() {
  const currentDate = new Date();
  const queryclient = useQueryClient();
  const { userType } = useAuth();
  const balanceData = queryclient.getQueryData<WalletTransactions>([
    "balance",
    userType,
  ]);

  const transactions = balanceData?.transactions;
  const groupedData = transactions
    ? groupAndSortTransactions(transactions)
    : [];

  const thisYearData = groupedData.filter(
    (data) => data.year === currentDate.getFullYear()
  );

  let displayData = [];
  for (let index = 0; index < 12; index++) {
    displayData[index] = { sum: 0 };
  }

  thisYearData.forEach((data) => (displayData[data.month] = data));

  return (
    <LineChart
      xAxis={[{ data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12] }]}
      series={[
        {
          data: [...displayData.map((data) => data.sum)],
          area: true,
        },
      ]}
      colors={["#707ac231"]}
      width={800}
      height={300}
    />
  );
}
