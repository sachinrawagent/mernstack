import React from "react";
import Table from "./Table";
import { useSelector, useDispatch } from "react-redux";
import { userLogin } from "../Redux/action";
const Home = () => {

  const token = useSelector((store) => store.login.token);
  const dispatch = useDispatch();

  const localStorageToken = localStorage.getItem("token");
  dispatch(userLogin(localStorageToken));

  return (
    <>
      {!token ? <h2>SIGNUP /SIGNIN REQUIRED</h2> : <Table />}

    </>
  );
};

export default Home;
