import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [context, setContext] = useState({
    profile: {
      id: 0,
      name: "",
      role: "",
      department_name: "",
      department_id: ""
    },
  });

  return (
    <AppContext.Provider value={{ context, setContext }}>
      {children}
    </AppContext.Provider>
  );
};
