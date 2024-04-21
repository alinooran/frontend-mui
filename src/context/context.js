import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [context, setContext] = useState({
    profile: {
      name: "",
      role: "",
    },
  });

  return (
    <AppContext.Provider value={{ context, setContext }}>
      {children}
    </AppContext.Provider>
  );
};
