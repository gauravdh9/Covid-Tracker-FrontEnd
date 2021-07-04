import React from "react";

const Card = ({ heading, data }) => {
  return (
    <div className="lg:w-3/12 w-5/6 shadow-xl border-2 rounded-lg h-20 p-4 m-4 lg:m-0">
      <span className="text-xl font-bold">{heading}</span>
      <span className="px-2">{data}</span>
    </div>
  );
};

export default Card;
