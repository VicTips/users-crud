export const notifyError = (msg, setErrorMsg) => {
  setErrorMsg(msg);
  setTimeout(() => setErrorMsg(null), 4000);
};
