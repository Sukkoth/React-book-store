import { useAuth } from "@/Providers/AuthProvider";
import { WalletTransactions } from "@/Types/types";
import {
  groupAndSortTransactions,
  matchMonthWithIndex,
} from "@/utils/groupTransactions";
import { useQueryClient } from "@tanstack/react-query";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
export default function LineChartGraph() {
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
    displayData[index] = { sum: 0, monthName: matchMonthWithIndex(index) };
  }

  thisYearData.forEach((data) => (displayData[data.month] = data));

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <AreaChart
        width={730}
        height={250}
        data={displayData.map((data) => {
          return { sum: data.sum, month: data.monthName };
        })}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id='sum' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='#8884d8' stopOpacity={0.8} />
            <stop offset='100%' stopColor='#8884d8' stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey='month' />
        <YAxis />
        <Tooltip />
        <Area
          type='monotone'
          dataKey='sum'
          stroke='#8884d8'
          fillOpacity={1}
          fill='url(#sum)'
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
