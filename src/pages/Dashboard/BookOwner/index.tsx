import BookStatus from "@/components/Dashboard/BookStatus";
import DailyStats from "../../../components/Dashboard/Admin/DailyStats";
import LineChart from "@/components/LineChart";

function index() {
  return (
    <div className='grid xl:grid-cols-[auto_1fr] gap-5 h-full overflow-hidden'>
      <DailyStats />
      <div>
        <div className='bg-white w-full p-5 rounded-xl shadow-lg shadow-gray-100 pt-10 '>
          <BookStatus />
        </div>
        <div className='bg-white w-full text-midnight-700 mt-5 h-full p-5 rounded-xl shadow-lg shadow-gray-100 pt-10 border border-yellow-500'>
          <LineChart />
        </div>
      </div>
    </div>
  );
}

export default index;
