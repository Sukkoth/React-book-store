import AppChart from "@/components/PiChart";
import { CategoryStatItem } from "@/Types/types";

function AvailableBooks({ data }: { data?: CategoryStatItem[] }) {
  const seriesData = data
    ? data.map((dataItem) => {
        return {
          id: dataItem.category.id,
          value: dataItem.quantity,
          label: dataItem.category.name,
        };
      })
    : [];

  return (
    <div className='shadow-lg rounded-md shadow-gray-100 p-5 w-full'>
      {/* header */}
      <div className='flex items-center justify-between'>
        <h2 className='font-medium text-xl text-gray-600'>Available Books</h2>
        <div className='border py-1 px-2 rounded-md bg-gray-200 text-gray-600 text-sm'>
          Today
        </div>
      </div>
      {/* stats and graph */}
      <div className='w-[18rem] h-[20rem]'>
        {/* graph */}
        {seriesData && <AppChart seriesData={seriesData} />}
        {/* categories count */}
      </div>
    </div>
  );
}

export default AvailableBooks;
