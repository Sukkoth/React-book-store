import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = [
  "#264653",
  "#2A9D8F",
  "#E9C46A",
  "#F4A261",
  "#E76F51",
  "#1D3557",
  "#457B9D",
  "#A8DADC",
  "#F1FAEE",
  "#2B2D42",
  "#8D99AE",
  "#EDF2F4",
  "#EF233C",
  "#D90429",
  "#FF6B6B",
  "#FFE66D",
  "#06D6A0",
  "#118AB2",
  "#073B4C",
  "#FFD166",
];

type Props = {
  seriesData: {
    id: number;
    value: number;
    label: string;
  }[];
};
function AppChart({ seriesData }: Props) {
  const data = seriesData.map((data) => {
    return { name: data.label, value: data.value };
  });
  return (
    <>
      <ResponsiveContainer width='100%' height='65%'>
        <PieChart>
          <Pie
            data={data}
            innerRadius={60}
            outerRadius={80}
            fill='#8884d8'
            paddingAngle={5}
            dataKey='value'
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              border: "solid 1px #8884d8",
              borderRadius: "10px",
              padding: "5px 8px",
              fontSize: "11px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className='space-y-2 py-2 '>
        {seriesData &&
          seriesData.map((dataItem, index) => (
            <div
              key={dataItem.id}
              className='grid grid-cols-[auto_1fr_auto] items-center px-3'
            >
              <div
                className='size-[1rem] rounded-full me-3'
                style={{
                  backgroundColor: COLORS[index] ?? COLORS[0],
                }}
              ></div>
              <p>{dataItem.label}</p>
              <p>{dataItem.value}</p>
            </div>
          ))}
      </div>
    </>
  );
}

export default AppChart;
