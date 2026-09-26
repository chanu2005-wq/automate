import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { name: "SUVs", value: 400 },
  { name: "Sedans", value: 300 },
  { name: "Luxury", value: 300 },
  { name: "Sports", value: 200 },
  { name: "Hatchbacks", value: 250 },
  { name: "Bikes", value: 350 },
  { name: "Vans", value: 180 },
  { name: "Electric", value: 220 },
];

const COLORS = [
  "#d97706",
  "#f59e0b",
  "#fbbf24",
  "#fcd34d",
  "#b45309",
  "#92400e",
  "#78350f",
  "#451a03",
];

const CategoryChart = () => {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={85}
            fill="#8884d8"
            paddingAngle={4}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />

          <Legend verticalAlign="bottom" height={36} iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryChart;
