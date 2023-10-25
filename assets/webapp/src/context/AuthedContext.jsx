import React, { createContext, useReducer, useEffect } from "react";

const initialState = { 
  appStatus: "LOADING", 
};
let reducer = (state, action) => {
  switch (action.type) {
    case "TENANT_USER_FOUND":
      return { 
        ...state, 
        authedUser: action.value.authedUser,
        tenantUser: action.value.tenantUser,
        appStatus: "APP" 
      };
    case "TENANT_USER_NOT_FOUND":
      return { 
        ...state,
        authedUser: action.value.authedUser,
        appStatus: "SETUP"
      };
    case "LOGOUT":
        return { ...initialState };
    default:
      return { ...initialState};
  }
};

const AuthedContext = createContext(null);

const AuthedContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthedContext.Provider value={{ authedState: state, authedDispatch: dispatch }}>
      {children}
    </AuthedContext.Provider>
  );
};

export { AuthedContext, AuthedContextProvider };
