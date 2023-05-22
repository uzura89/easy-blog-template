import { createContext, useEffect, useState } from "react";
import { callFetchIsAdmin } from "@/ajax/AuthAjax";

interface ContextType {
  isAdmin: boolean | undefined;
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AdminContext = createContext<ContextType>({
  isAdmin: undefined,
  setIsAdmin: () => {},
});

interface Props {
  children: React.ReactNode;
}

export default function ContextProvider(props: Props) {
  const [isAdmin, setIsAdmin] = useState(false);

  const getIsAdmin = async () => {
    const { isAdmin } = await callFetchIsAdmin();
    setIsAdmin(isAdmin);
  };

  useEffect(() => {
    getIsAdmin();
  }, []);

  return (
    <AdminContext.Provider value={{ isAdmin, setIsAdmin }}>
      {props.children}
    </AdminContext.Provider>
  );
}
