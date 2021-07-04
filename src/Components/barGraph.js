import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const styling = {
  Active: "bg-blue-500",
  Deceased: "bg-gray-500",
  Recovered: "bg-green-500",
};

const BarGraph = ({ data }) => {
  return (
    <ResponsiveContainer width="90%" height="70%" className="my-10">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey={(data) =>
            new Date(data.date).toISOString().substr(0, 10).replaceAll("-", "/")
          }
        />
        <YAxis />
        <Tooltip />
        <Legend
          payload={[
            { value: "Active", type: "circle", id: "a" },
            { value: "Recovered", type: "circle", id: "b" },
            { value: "Deceased", type: "circle", id: "c" },
          ]}
          content={({ payload }) => (
            <div className=" flex justify-center items-center w-full">
              {payload.map((item) => (
                <>
                  <div
                    className={
                      styling[item?.value] + " w-4 h-4 rounded-full font-bold"
                    }
                  />
                  <span className={"px-4"}>{item.value}</span>
                </>
              ))}
            </div>
          )}
        />
        <Bar dataKey={(data) => data.cases.Active} stackId="a" fill="#3b82f6" />
        <Bar
          dataKey={(data) => data.cases.Recovered}
          stackId="b"
          fill="#10b981"
        />
        <Bar
          dataKey={(data) => data.cases.Deceased}
          stackId="c"
          fill="#6b7280"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarGraph;
