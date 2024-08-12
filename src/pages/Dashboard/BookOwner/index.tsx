import BookStatus from "@/components/Dashboard/Admin/BookStatus";
import DailyStats from "../../../components/Dashboard/Admin/DailyStats";

function index() {
  return (
    <div className='grid xl:grid-cols-[auto_1fr] gap-5 h-full overflow-hidden'>
      <DailyStats />
      <div>
        <div className='bg-white w-full p-5 rounded-xl shadow-lg shadow-gray-100 pt-10 '>
          <BookStatus />
        </div>
        <div className='bg-white w-full mt-5 h-full p-5 rounded-xl shadow-lg shadow-gray-100 pt-10 '>
          Earnings
        </div>
      </div>
    </div>
  );
}

export default index;
