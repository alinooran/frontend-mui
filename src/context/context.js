import { createContext, useState } from "react";

export const AppContext = createContext({
  profile: {
    fullname: "",
    role: "",
  },
});

export const AppProvider = ({ children }) => {
  const [context, setContext] = useState({});

  return (
    <AppContext.Provider value={{ context, setContext }}>
      {children}
    </AppContext.Provider>
  );
};
