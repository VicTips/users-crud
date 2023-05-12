import { useMutation } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DELETE_USER } from "../users/graphql-mutations";
import { GET_USERS } from "../users/graphql-queries";
import { notifyError } from "../utils/notifyError";
import ShowError from "./ShowError";

const Table = ({ headers, data }) => {
  const [errorMsg, setErrorMsg] = useState(null);

  const [deleteUser, resultDelete] = useMutation(DELETE_USER, {
    refetchQueries: [{ query: GET_USERS }],
    onError: (error) => {
      notifyError(error.graphQLErrors[0].message, setErrorMsg);
    },
  });

  useEffect(() => {
    if (resultDelete.data) alert("User deleted succesfully!");
  }, [resultDelete.data]);

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-cyan-800 text-white">
            {headers.map((header, index) => {
              return (
                <th
                  key={index}
                  className="px-3 py-2 tracking-wide font-semibold"
                >
                  {header}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="bg-neutral-100">
          {data.map((row, index) => {
            return (
              <tr key={index}>
                <td>{row.name}</td>
                <td>{row.email}</td>
                <td>{row.gender}</td>
                <td>{row.status}</td>
                <td>
                  <div className="flex justify-center gap-x-2">
                    <Link
                      to={`/form/${row.id}`}
                      className="btn btn--blue text-sm"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteUser({ variables: { id: row.id } })}
                      className="btn btn--fuchsia text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* <ShowError errorMsg={errorMsg} /> */}
    </div>
  );
};

export default Table;
