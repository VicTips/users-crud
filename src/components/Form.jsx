import React, { useEffect, useState } from "react";
import { useMutation, useLazyQuery } from "@apollo/client";
import { CREATE_USER, UPDATE_USER } from "../users/graphql-mutations";
import { GET_USER, GET_USERS } from "../users/graphql-queries";
import { Link, useParams } from "react-router-dom";
import { notifyError } from "../utils/notifyError";
import UsersGroupIcon from "./UsersGroupIcon";
import LoadingSpinner from "./LoadingSpinner";
import { genderOptions } from "../data/genderOptions";
import { statusOptions } from "../data/statusOptions";
import Swal from "sweetalert2";

const Form = () => {
  const { id } = useParams();

  const [getUser, resultPerson] = useLazyQuery(GET_USER);

  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    if (id) getUser({ variables: { id: id } });
  }, [errorMsg]);

  const [variables, setVariables] = useState({
    name: "",
    email: "",
    gender: "",
    status: "",
  });

  useEffect(() => {
    if (resultPerson.data) {
      setVariables({
        name: resultPerson.data.user.name,
        email: resultPerson.data.user.email,
        gender: resultPerson.data.user.gender,
        status: resultPerson.data.user.status,
      });
    }
  }, [resultPerson]);

  const [createUser, resultCreate] = useMutation(CREATE_USER, {
    refetchQueries: [{ query: GET_USERS }],
    onError: (error) => {
      notifyError(error.graphQLErrors[0].message, setErrorMsg);
    },
  });

  const [updateUser, resultUpdate] = useMutation(UPDATE_USER, {
    refetchQueries: [{ query: GET_USERS }],
    onError: (error) => {
      notifyError(error.graphQLErrors[0].message, setErrorMsg);
    },
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setVariables((variables) => ({ ...variables, [name]: value }));
  };

  const cleanState = () => {
    setVariables({
      name: "",
      email: "",
      gender: "",
      status: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) updateUser({ variables: { ...variables, id: parseInt(id) } });
    else {
      createUser({ variables: variables });
      cleanState();
    }
  };

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

  useEffect(() => {
    if (resultCreate.data)
      Swal.fire({
        icon: "success",
        title: "User created successfully!",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
  }, [resultCreate.data]);

  useEffect(() => {
    if (resultUpdate.data)
      Swal.fire({
        icon: "success",
        title: "User updated successfully!",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
  }, [resultUpdate.data]);

  if (resultPerson.loading || resultCreate.loading || resultUpdate.loading)
    return <LoadingSpinner />;
  return (
    <div className="bg-neutral-50">
      <div className="flex flex-col justify-center items-center max-w-5xl mx-auto min-h-screen">
        <h2 className="text-2xl pb-4">
          {id ? (
            <div className="flex gap-x-2 items-center">
              <div className="h-14 w-14 text-lime-600">
                <UsersGroupIcon />
              </div>
              <h1 className="text-3xl font-bold text-neutral-900">
                Update user
              </h1>
            </div>
          ) : (
            <div className="flex gap-x-2 items-center">
              <div className="h-14 w-14 text-lime-600">
                <UsersGroupIcon />
              </div>
              <h1 className="text-3xl font-bold text-neutral-900">
                Create user
              </h1>
            </div>
          )}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col max-w-sm items-center gap-y-3 w-full px-3"
        >
          <div className="flex flex-col w-full">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              placeholder="Name"
              type="text"
              value={variables.name || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              placeholder="Email"
              type="email"
              value={variables.email || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              onChange={handleChange}
              value={variables.gender || "default"}
              required
            >
              <option defaultValue disabled value="default">
                Select gender
              </option>
              {genderOptions.map((gender, index) => {
                return (
                  <option key={index} value={gender}>
                    {gender}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              onChange={handleChange}
              value={variables.status || "default"}
              required
            >
              <option defaultValue disabled value="default">
                Select status
              </option>
              {statusOptions.map((status, index) => {
                return (
                  <option key={index} value={status}>
                    {status}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex gap-x-2 pt-4">
            <button className="btn btn--blue">
              {id ? "Update" : "Create"}
            </button>
            <Link to="/" className="btn btn--fuchsia" type="button">
              Go Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
