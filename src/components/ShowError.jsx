import React from "react";

const ShowError = ({ errorMsg }) => {
  if (!errorMsg) return null;
  return <div>{errorMsg}</div>;
};

export default ShowError;
