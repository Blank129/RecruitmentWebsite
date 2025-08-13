"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";
import { getDetailJob, getListJobs } from "../service/api";

type UserContextType = {
    listJobs: any[];
    infoJobs: any;
    setInfoJobs: any;
    handleGetDetailJob: any;
};

const UserContexts = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [listJobs, setListJobs] = useState<any[]>([]);
  const [infoJobs, setInfoJobs] = useState<any>(null);

  const handleGetListJobs = async () => {
    try {
      const res = await getListJobs();
      if (res.status === 200) {
        setListJobs(res.data.data);
      }
    } catch (error) {
      return error;
    }
  };

  const handleGetDetailJob = async (id: any) => {
    try {
      const res = await getDetailJob(id);
      if(res.status === 200) {
        setInfoJobs(res.data);
      }
    } catch (error) {
      return error;
    }
  }

  useEffect(() => {
    handleGetListJobs();
  }, []);

  return (
    <UserContexts.Provider value={{ listJobs, infoJobs, setInfoJobs, handleGetDetailJob }}>
      {children}
    </UserContexts.Provider>
  );
};

export const UserContext = (): UserContextType => {
  const context = useContext(UserContexts);
  if (!context) {
    return {} as UserContextType;
  }
  return context;
};
