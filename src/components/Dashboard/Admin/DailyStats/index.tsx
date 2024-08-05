import Header from "./Header";
import IncomeCard from "./IncomeCard";
import AvailableBooks from "../AvailableBooks";

export default function DailyStats() {
  return (
    <div className='bg-white  p-5 h-full rounded-xl shadow-lg shadow-gray-100'>
      <Header />
      <div className='pt-8 block lg:flex xl:block lg:justify-evenly'>
        <IncomeCard />
        <div className='pt-5 w-full'>
          <AvailableBooks />{" "}
        </div>
      </div>
    </div>
  );
}
