import { useAuth } from "@/Providers/AuthProvider";
import { WalletTransactions } from "@/Types/types";
import {
  groupAndSortTransactions,
  // groupedTransactionsData,
} from "@/utils/groupTransactions";
import { LineChart } from "@mui/x-charts/LineChart";
import { useQueryClient } from "@tanstack/react-query";

export default function BasicArea() {
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

  return (
    <LineChart
      xAxis={[{ data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12] }]}
      series={[
        {
          data: [...groupedData.map((data) => data.sum)],
          area: true,
        },
      ]}
      colors={["#707ac231"]}
      width={800}
      height={300}
    />
  );
}
