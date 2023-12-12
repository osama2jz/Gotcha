import { createContext, useState } from "react";
export const UserContext = createContext();
export const UserProvider = ({ children }) => {
  let userData = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState({
    BusinessName: userData?.BusinessName,
    BusinessWebsite: userData?.BusinessWebsite,
    Email: userData?.Email,
    IsOwner: userData?.IsOwner,
    IsActive: userData?.IsActive,
    id: userData?._id,
    email: userData?.email
  });
  const value = { user, setUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
