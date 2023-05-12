import { useMutation } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DELETE_USER } from "../users/graphql-mutations";
import { GET_USERS } from "../users/graphql-queries";
import { notifyError } from "../utils/notifyError";
import Swal from "sweetalert2";

const Table = ({ headers, data }) => {
  const warningModal = (row) => {
    Swal.fire({
      title: `Are you sure that you want to delete "${row.name}"?`,
      text: "This user will be deleted inmediately. You can't undo this action.",
      icon: "warning",
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      customClass: {
        confirmButton: "btn btn--blue mr-4",
        cancelButton: "btn btn--fuchsia",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser({ variables: { id: row.id } });
      }
    });
  };

  const [errorMsg, setErrorMsg] = useState(null);

  const [deleteUser, resultDelete] = useMutation(DELETE_USER, {
    refetchQueries: [{ query: GET_USERS }],
    onError: (error) => {
      notifyError(error.graphQLErrors[0].message, setErrorMsg);
    },
  });

  useEffect(() => {
    if (resultDelete.data)
      Swal.fire({
        icon: "success",
        title: "User deleted successfully!",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
  }, [resultDelete.data]);

  useEffect(() => {
    if (errorMsg)
      Swal.fire({
        icon: "error",
        title: errorMsg,
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
  }, [errorMsg]);

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
                      onClick={() => warningModal(row)}
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
    </div>
  );
};

export default Table;
