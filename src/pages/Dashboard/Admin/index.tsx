import BookStatus from "@/components/Dashboard/BookStatus";
import DailyStats from "../../../components/Dashboard/Admin/DailyStats";
import LineChartGraph from "@/components/LineChart";

function index() {
  return (
    <div className='grid xl:grid-cols-[auto_1fr] gap-5 h-full overflow-hidden'>
      {/* stats */}
      <DailyStats />
      {/* right side */}
      <div>
        {/* book status */}
        <div className='bg-white w-full p-5 rounded-xl shadow-lg shadow-gray-100 pt-10 '>
          <BookStatus />
          {/* <BooksTable /> */}
        </div>
        <div className='bg-white w-full mt-5 h-[32%] overflow-hidden p-5 rounded-xl shadow-lg shadow-gray-100 pt-10'>
          <LineChartGraph />
        </div>
      </div>
    </div>
  );
}

export default index;
