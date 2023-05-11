import React from "react";
import EditIcon from "./EditIcon";
import DeleteIcon from "./DeleteIcon";
import { Link } from "react-router-dom";

const Table = ({ headers, data }) => {
  return (
    <table>
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
      <tbody>
        {data.map((row, index) => {
          return (
            <tr key={index} className="hover:bg-neutral-400/30">
              <td className="px-3 py-1 text-center">{row.name}</td>
              <td className="px-3 py-1 text-center">{row.email}</td>
              <td className="px-3 py-1 text-center">{row.gender}</td>
              <td className="px-3 py-1 text-center">{row.status}</td>
              <td className="px-3 py-1">
                <div className="flex justify-center gap-x-2">
                  <Link
                    to={`/form/${row.id}`}
                    className="btn btn--blue text-sm"
                  >
                    Edit
                  </Link>
                  <button className="btn btn--fuchsia text-sm">Delete</button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
