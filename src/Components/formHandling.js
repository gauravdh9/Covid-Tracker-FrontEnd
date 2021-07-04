import React from "react";

const FormHandling = ({
  heading,
  handleChange,
  handleSubmit,
  Data,
  values,
}) => {
  return (
    <>
      <span className="text-3xl font-semibold my-4">{heading}</span>
      <form
        onSubmit={handleSubmit}
        className="w-1/4 flex bg-gray-100 rounded-xl shadow-lg flex-col justify-center items-center p-4"
      >
        {Data.map((item) => (
          <div className="flex flex-col p-3" key={item.value}>
            <span className="font-medium text-xl text-gray-700 my-1">
              {item.text}
            </span>
            <input
              name={item.value}
              value={values[item.value]}
              onChange={handleChange}
              placeholder={"Enter " + item.text}
              className="rounded-lg p-3 shadow-md outline-none"
              type={item.type}
            />
          </div>
        ))}

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 m-2 rounded-md"
        >
          {heading}
        </button>
      </form>
    </>
  );
};

export default FormHandling;
