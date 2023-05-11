import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../users/graphql-mutations";

const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");

  const [createUser] = useMutation(CREATE_USER);

  const handleSubmit = (e) => {
    e.preventDefault();

    createUser({ variables: { name, email, gender, status } });

    setName("");
    setEmail("");
    setGender("");
    setStatus("");
  };

  return (
    <>
      <h2 className="text-2xl">Create user</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Gender"
          type="text"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />
        <input
          placeholder="Status"
          type="text"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        <button className="btn btn--fuchsia">Create</button>
      </form>
    </>
  );
};

export default Form;
