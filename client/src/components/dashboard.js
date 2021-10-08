import React from "react";
import { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";

const Dashboard = ({ setAuth }) => {
  const [name, setname] = useState("");

  async function getName() {
    try {
      const response = await fetch("http://localhost:5000/dashboard/", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();
      console.log(parseRes);
      setname(parseRes.user_name);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getName();
  }, []);

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    toast.success("Logging Out!");
  };
  return (
    <Fragment>
      <h1>dashboard {name}</h1>
      <button
        className="btn btn-primary"
        onClick={(e) => {
          logout(e);
        }}
      >
        Logout
      </button>
    </Fragment>
  );
};

export default Dashboard;
