import { useGetOwnerBalance } from "@/queries/queries";
import {
  calculatePercentageChange,
  getTotalAmountForPeriod,
  groupAndSortTransactions,
} from "@/utils/groupTransactions";

function IncomeCard() {
  const currentDate = new Date();
  const getOwnerBalance = useGetOwnerBalance();
  const balance = getOwnerBalance.data?.wallet.balance;
  const groupedTransactions = getOwnerBalance.data
    ? groupAndSortTransactions(getOwnerBalance.data?.transactions)
    : [];

  const thisMonthAmount = getTotalAmountForPeriod(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1, //add + 1 to get current (month is 0 based index)
    groupedTransactions
  );

  const lastMonthAmount = getTotalAmountForPeriod(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    groupedTransactions
  );
  const differencePercentage = calculatePercentageChange(
    lastMonthAmount,
    thisMonthAmount
  );
  return (
    <div className='p-5 shadow-lg rounded-md shadow-gray-100 w-full'>
      {getOwnerBalance.isLoading ? (
        <div className='h-full'>
          <p>Loading . . .</p>
        </div>
      ) : (
        <>
          <div className='flex items-center justify-between pb-3 border-b border-b-gray-300'>
            <h2 className='font-medium text-xl text-gray-600'>Income</h2>
            <div className='border py-1 px-2 rounded-md bg-gray-200 text-gray-600 text-sm'>
              Today
            </div>
          </div>
          <div className='pt-5 flex items-end gap-2'>
            <h1 className='font-bold text-xl md:text-3xl'>ETB ${balance}</h1>
            <div
              className={`${
                differencePercentage < 0 ? "text-red-500" : "text-green-500"
              } inline-flex gap-1`}
            >
              {/* <GoArrowDown size={15} /> */}
              <span className='text-sm'>{differencePercentage}%</span>
            </div>
          </div>
          <div className='mt-5'>
            <p className='text-gray-500 text-lg md:text-xl font-light'>
              Compared to ETB{thisMonthAmount - lastMonthAmount} last month
            </p>
            <div className='inline-flex gap-4'>
              <p>Last Month Income</p>
              <p className='font-medium'>ETB {lastMonthAmount}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default IncomeCard;
