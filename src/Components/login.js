import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { LOGIN_USER } from "../Graphql/queries";
import { useHistory } from "react-router-dom";
import { loginAction } from "../redux/slice/userSlice";
import FormHandling from "./formHandling";
import { useDispatch } from "react-redux";

const initialState = { email: "", password: "" };

const Data = [
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

const Login = () => {
  const history = useHistory();

  const dispatch = useDispatch();

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

  const [login, { data }] = useLazyQuery(LOGIN_USER, {
    onCompleted: () => {
      dispatch(
        loginAction({
          email: data.login.user.email,
          name: data.login.user.name,
        })
      );
      localStorage.setItem("token", data.login.token);
      if (localStorage.getItem("token")) history.push("/dashboard");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    login({
      variables: {
        email: values.email,
        password: values.password,
      },
    });
  };

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <FormHandling
        Data={Data}
        heading="Log In"
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        values={values}
      />
    </div>
  );
};

export default Login;
