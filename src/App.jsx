import React from "react";
import "./index.css";
import UsersGroupIcon from "./components/UsersGroupIcon";
import DoubleRightArrowIcon from "./components/DoubleRightArrowIcon";
import AddIcon from "./components/AddIcon";
import Table from "./components/Table";
import { tableHeaders } from "./data/tableHeaders";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "./users/graphql-queries";

const App = () => {
  const { loading, error, data } = useQuery(GET_USERS);
  console.log(data);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  return (
    <div className="font-poppins min-h-screen bg-neutral-50 flex flex-col justify-center items-center">
      <div className="flex gap-x-1 items-center">
        <div className="h-20 w-20 text-lime-600">
          <UsersGroupIcon />
        </div>
        <h1 className="text-5xl font-bold text-neutral-900">Users</h1>
      </div>
      <Table headers={tableHeaders} data={data.users.nodes} />
      <p className="text-sm text-neutral-600 italic">
        Last users added to the database
      </p>
      <div className="flex gap-x-3">
        <button className="btn btn--fuchsia flex justify-center items-center gap-x-1">
          All Users <DoubleRightArrowIcon />
        </button>
        <button className="btn btn--blue flex justify-center items-center gap-x-1">
          New User <AddIcon />
        </button>
      </div>
    </div>
  );
};

export default App;
