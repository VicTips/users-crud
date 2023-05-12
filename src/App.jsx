import React from "react";
import "./index.css";
import UsersGroupIcon from "./components/UsersGroupIcon";
import AddIcon from "./components/AddIcon";
import Table from "./components/Table";
import { tableHeaders } from "./data/tableHeaders";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "./users/graphql-queries";
import { Link } from "react-router-dom";
import LoadingSpinner from "./components/LoadingSpinner";

const App = () => {
  const { loading, error, data } = useQuery(GET_USERS);
  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error</p>;
  return (
    <div className="bg-neutral-50">
      <div className="font-poppins min-h-screen flex flex-col justify-center items-center max-w-7xl mx-auto gap-y-5 px-3">
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-x-2 items-center">
            <div className="h-14 w-14 text-lime-600">
              <UsersGroupIcon />
            </div>
            <h1 className="text-3xl font-bold text-neutral-900">Users</h1>
          </div>
          <Link
            to="/form"
            className="btn btn--green flex justify-center items-center gap-x-1"
          >
            New User <AddIcon />
          </Link>
        </div>
        <Table headers={tableHeaders} data={data.users.nodes} />
      </div>
    </div>
  );
};

export default App;
