import React from "react";

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

export default DateComponent;
