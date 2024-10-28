import React, { createContext, useState } from "react";
export const ContextProvider = createContext({
  token: "",
  interestRateData: null,
  isUserLogin: false,
  adminToken: "",
  addInterestRateData: () => {},
  addToken: () => {},
  changeUserLoginHandle: () => {},
  addAdminToken: () => {},
});

const ContextApi = ({ children }) => {
  const [interestRateData, setInterestData] = useState(null);
  const [isUserLogin, setIsUserLogin] = useState(false);
  const [token, setToken] = useState(localStorage?.getItem("token"));
  const [adminToken, setAdminToken] = useState(
    localStorage?.getItem("adminToken")
  );
  function addToken(value) {
    setToken(value);
  }
  function addInterestRateData(value) {
    setInterestData(value);
  }
  function changeUserLoginHandle(value) {
    setIsUserLogin(value);
  }
  function addAdminToken(value) {
    setAdminToken(value || localStorage.getItem("adminToken"));
  }
  return (
    <>
      <ContextProvider.Provider
        value={{
          interestRateData,
          addInterestRateData,
          token,
          addToken,
          changeUserLoginHandle,
          isUserLogin,
          adminToken,
          addAdminToken,
        }}
      >
        {children}
      </ContextProvider.Provider>
    </>
  );
};

export default ContextApi;
