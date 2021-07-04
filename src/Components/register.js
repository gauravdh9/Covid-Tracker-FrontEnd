import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { REGISTER_USER } from "../Graphql/queries";
import { useHistory } from "react-router-dom";
import FormHandling from "./formHandling";

const initialState = { name: "", email: "", password: "" };

const Data = [
  {
    text: "Name",
    type: "text",
    value: "name",
  },
  {
    text: "Email",
    type: "text",
    value: "email",
  },
  {
    text: "Password",
    type: "password",
    value: "password",
  },
];

const Register = () => {
  const history = useHistory();
  const [values, setValues] = useState(initialState);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      history.push("/dashboard");
    }
  }, []);

  const [register, { data }] = useMutation(REGISTER_USER, {
    onCompleted: () => history.push("/login"),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    register({
      variables: {
        name: values.name,
        email: values.email,
        password: values.password,
      },
    });
  };

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <FormHandling
        heading="Register"
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        Data={Data}
        values={values}
      />
    </div>
  );
};

export default Register;
