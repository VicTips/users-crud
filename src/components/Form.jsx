import React, { useEffect, useState } from "react";
import { useMutation, useLazyQuery } from "@apollo/client";
import { CREATE_USER, UPDATE_USER } from "../users/graphql-mutations";
import { GET_USER, GET_USERS } from "../users/graphql-queries";
import { Link, useParams } from "react-router-dom";
import ShowError from "./ShowError";

const Form = () => {
  const { id } = useParams();

  const [getUser, resultPerson] = useLazyQuery(GET_USER);

  useEffect(() => {
    if (id) getUser({ variables: { id: id } });
  }, []);

  const [errorMsg, setErrorMsg] = useState(null);

  const notifyError = (msg) => {
    setErrorMsg(msg);
    setTimeout(() => setErrorMsg(null), 4000);
  };

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
      notifyError(error.graphQLErrors[0].message);
    },
  });

  const [updateUser, resultUpdate] = useMutation(UPDATE_USER, {
    refetchQueries: [{ query: GET_USERS }],
    onError: (error) => {
      notifyError(error.graphQLErrors[0].message);
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
    else createUser({ variables: variables });
    cleanState();
  };

  useEffect(() => {
    if (resultCreate.data) alert("User created succesfully!");
  }, [resultCreate.data]);

  useEffect(() => {
    if (resultUpdate.data) alert("User Updated succesfully!");
  }, [resultUpdate.data]);

  return (
    <>
      <h2 className="text-2xl">Create user</h2>
      <form onSubmit={handleSubmit}>
        <input
          id="name"
          name="name"
          placeholder="Name"
          type="text"
          value={variables.name || ""}
          onChange={handleChange}
        />
        <input
          id="email"
          name="email"
          placeholder="Email"
          type="text"
          value={variables.email || ""}
          onChange={handleChange}
        />
        <input
          id="gender"
          name="gender"
          placeholder="Gender"
          type="text"
          value={variables.gender || ""}
          onChange={handleChange}
        />
        <input
          id="status"
          name="status"
          placeholder="Status"
          type="text"
          value={variables.status || ""}
          onChange={handleChange}
        />
        <button className="btn btn--fuchsia">{id ? "Update" : "Create"}</button>
      </form>
      <Link to="/" className="btn btn--fuchsia">
        Go Back
      </Link>

      <ShowError errorMsg={errorMsg} />
    </>
  );
};

export default Form;
