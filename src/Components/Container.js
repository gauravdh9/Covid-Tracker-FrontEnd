import { useLazyQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GET_DATA } from "../Graphql/queries";
import BarGraph from "./barGraph";

const initialValue = { start: "2021/01/01", end: "2021/02/26" };

const Card = ({ heading, data }) => {
  return (
    <div className="lg:w-3/12 w-5/6 shadow-xl border-2 rounded-lg h-20 p-4 m-4 lg:m-0">
      <span className="text-xl font-bold">{heading}</span>
      <span className="px-2">{data}</span>
    </div>
  );
};

const Container = () => {
  const params = useParams();
  const [date, setDate] = useState(initialValue);
  const [getData, { data, refetch }] = useLazyQuery(GET_DATA, {
    onCompleted: () => console.log("Hello"),
    variables: { start: date.start, end: date.end },
  });
  var estimation = 0;
  var prevMonthData = 0;
  var currentMonthData = 0;

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setDate({ ...date, [name]: value.replaceAll("-", "/") });
    refetch();
  };

  useEffect(() => {
    getData();
  }, []);
  var prevMonthList = data?.getData.filter((item) => {
    return (
      new Date(item.date).getMonth() === Number(date?.end.split("/")[1]) - 2
    );
  });
  var currentMonthList = data?.getData.filter((item, index) => {
    return (
      new Date(item.date).getMonth() === Number(date?.end.split("/")[1]) - 1
    );
  });

  currentMonthList?.forEach((element) => {
    estimation += element.cases[params.type];
    currentMonthData += element.cases[params.type];
  });
  estimation = parseInt((estimation / currentMonthList?.length) * 30);

  prevMonthList?.forEach((element) => {
    prevMonthData += element.cases[params.type];
  });

  return (
    <div
      style={{ height: "850px" }}
      className="w-full  flex flex-col items-center"
    >
      <DateComponent
        start={date.start}
        end={date.end}
        handleChange={handleChange}
      />
      <div className="flex w-full flex-col lg:flex-row justify-around items-center">
        <Card
          heading={"Month to date " + params.type + " cases"}
          data={currentMonthData}
        />
        <Card
          heading={"Last Month " + params.type + " cases"}
          data={prevMonthData}
        />
        <Card
          heading={"Estimated Month End " + params.type + " cases"}
          data={estimation}
        />
      </div>
      {data?.getData && <BarGraph data={data?.getData} />}
    </div>
  );
};

export default Container;

const DateComponent = ({ start, end, handleChange }) => {
  return (
    <div className="flex w-full h-20 my-4  justify-center items-center">
      <div className="flex flex-col w-56 shadow-xl px-4 mx-4 py-2 rounded-lg border-2">
        <span className="text-gray-600 font-bold">From</span>
        <input
          type="date"
          name="start"
          onChange={handleChange}
          value={start.replaceAll("/", "-")}
          min="2020-01-30"
          max="2021-03-26"
          className="cursor-pointer m-1"
        />
      </div>
      <div className="flex flex-col w-56 shadow-xl px-4 mx-4 py-2 rounded-lg border-2">
        <span className="text-gray-600 font-bold">To</span>

        <input
          type="date"
          name="end"
          onChange={handleChange}
          value={end.replaceAll("/", "-")}
          min="2020-01-30"
          max="2021-03-26"
          className="cursor-pointer m-1"
        />
      </div>
    </div>
  );
};
