import { CategoryStatItem } from "@/Types/types";
import { PieChart } from "@mui/x-charts";
import randomColor from "randomcolor";

function AvailableBooks({ data }: { data?: CategoryStatItem[] }) {
  const seriesData = data
    ? data.map((dataItem) => {
        return {
          id: dataItem.category.id,
          value: dataItem.quantity,
          label: dataItem.category.name,
          color: randomColor(),
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
      <div className=''>
        {/* graph */}
        {seriesData && (
          <PieChart
            sx={{
              paddingTop: "1rem",
            }}
            series={[
              {
                data: seriesData,
                innerRadius: 64,
                outerRadius: 84,
                cx: "75%",
              },
            ]}
            width={300}
            height={180}
            legend={{
              hidden: true,
            }}
          />
        )}
        {/* categories count */}
        <div className='space-y-2 py-2'>
          {seriesData &&
            seriesData.map((dataItem) => (
              <div
                key={dataItem.id}
                className='grid grid-cols-[auto_1fr_auto] items-center px-3'
              >
                <div
                  className='size-[1rem] rounded-full me-3'
                  style={{
                    backgroundColor: dataItem.color,
                  }}
                ></div>
                <p>{dataItem.label}</p>
                <p>{dataItem.value}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default AvailableBooks;
