/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const WorkspaceContext = createContext();

export const WorkspaceProvider = ({ children }) => {
  const [workspaceName, setWorkspaceName] = useState("");

  return (
    <WorkspaceContext.Provider value={{ workspaceName, setWorkspaceName }}>
      {children}
    </WorkspaceContext.Provider>
  );
};
