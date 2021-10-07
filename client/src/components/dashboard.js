import React from "react";
import { Fragment } from "react";

const Dashboard = ({ setAuth }) => {
  return (
    <Fragment>
      <h1>dashboard</h1>
      <button
        onClick={() => {
          setAuth(false);
        }}
      >
        Logout
      </button>
    </Fragment>
  );
};

export default Dashboard;
