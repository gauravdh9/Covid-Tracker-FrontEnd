import { useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { GET_TOTAL_DATA } from "../Graphql/queries";
import { Link } from "react-router-dom";
const styling = {
  Active: "border-blue-500 bg-blue-300 text-blue-500",
  Recovered: "border-green-500 bg-green-300 text-green-500",
  Deceased: "border-gray-500 bg-gray-300 text-gray-500",
};

const Dashboard = () => {
  const [getTotalData, { data }] = useLazyQuery(GET_TOTAL_DATA, {});

  useEffect(() => {
    getTotalData();
  }, []);
  return (
    <div
      style={{ height: "800px" }}
      className="flex justify-center items-center flex-col"
    >
      <div className="flex w-full  flex-col lg:flex-row justify-between lg:justify-around h-5/6 p-8 items-center ">
        {data?.getTotalData.total &&
          Object.keys(data?.getTotalData?.total).map(
            (item) =>
              (item === "Active" ||
                item === "Recovered" ||
                item === "Deceased") && (
                <Link
                  to={"/dashboard/" + item}
                  className={`m-2 flex flex-col  p-4 border-4  rounded-lg shadow-lg w-2/3 lg:w-2/12 h-44 ${styling[item]}`}
                >
                  <div className="flex flex-col justify-center items-center">
                    <span className="font-bold text-3xl">Total</span>
                    <span
                      className={`font-semibold text-2xl mx-4 ${styling[item]}`}
                    >
                      {item}
                    </span>
                    <span className=" text-xl">
                      {data?.getTotalData.total[item]}
                    </span>
                  </div>
                </Link>
              )
          )}
      </div>
    </div>
  );
};

export default Dashboard;
