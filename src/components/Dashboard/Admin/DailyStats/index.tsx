import Header from "./Header";
import IncomeCard from "./IncomeCard";
import AvailableBooks from "../AvailableBooks";
import { useCategoryStats } from "@/queries/queries";
import MainFallback from "@/Fallbacks/MainFallback";

export default function DailyStats() {
  const { isLoading, data } = useCategoryStats();

  return (
    <div className='bg-white  p-5 h-full rounded-xl shadow-lg shadow-gray-100'>
      <Header />
      <div className='pt-8 block lg:flex xl:block lg:justify-evenly'>
        <IncomeCard />
        <div className='pt-5 w-full'>
          {isLoading ? <MainFallback /> : <AvailableBooks data={data} />}{" "}
        </div>
      </div>
    </div>
  );
}
