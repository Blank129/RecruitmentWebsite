"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import {
  getListRecruitment,
  getTags,
  getTypeRecruit,
  postAddRecruit,
  putUpdateRecruit,
} from "../service/api";
import { useRouter } from "next/navigation";

type RecruitContextType = {
  listType: any[];
  listTags: any[];
  listRecruit: any[];
  setListRecruit: any;
  handleGetListRecruit: any;
  handlePostAddRecruit: any;
  handlePutUpdateRecruit: any;
};

const RecruitContexts = createContext<RecruitContextType | undefined>(
  undefined
);

export const RecruitProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [listType, setListType] = useState<any[]>([]);
  const [listTags, setListTags] = useState<any[]>([]);
  const [listRecruit, setListRecruit] = useState([]);

  const handleGetListType = async () => {
    try {
      const res = await getTypeRecruit();
      if (res) {
        setListType(res.data.data);
      }
    } catch (error) {
      return error;
    }
  };

  const handleGetListTags = async () => {
    try {
      const res = await getTags();
      if (res) {
        setListTags(res.data.data);
      }
    } catch (error) {
      return error;
    }
  };

  const handleGetListRecruit = async (token: string) => {
    try {
      const res = await getListRecruitment(token);
      if (res) {
        setListRecruit(res.data);
      }
    } catch (error) {
      return error;
    }
  };

  const handlePostAddRecruit = async (
    token: string,
    company: any,
    deadline: any,
    description: any,
    experience: any,
    location: any,
    salary: any,
    title: any,
    type: any,
    tags: any
  ) => {
    try {
      const res = await postAddRecruit(
        token,
        company,
        deadline,
        description,
        experience,
        location,
        salary,
        title,
        type,
        tags
      );
      if (res) {
        const token = localStorage.getItem("userToken");
        if (token) {
          await handleGetListRecruit(token);
        }
      }
    } catch (error) {
      return error;
    }
  };

  const handlePutUpdateRecruit = async (
    token: string,
    id_job: any,
    company: any,
    deadline: any,
    description: any,
    experience: any,
    location: any,
    salary: any,
    title: any,
    type: any,
    tags: any
  ) => {
    try {
      const res = await putUpdateRecruit(
        token,
        id_job,
        company,
        deadline,
        description,
        experience,
        location,
        salary,
        title,
        type,
        tags
      );
      if (res) {
        const token = localStorage.getItem("userToken");
        if (token) {
          await handleGetListRecruit(token);
        }
      }
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    handleGetListType();
    handleGetListTags();
  }, []);

  return (
    <RecruitContexts.Provider
      value={{
        listType,
        listTags,
        listRecruit,
        setListRecruit,
        handleGetListRecruit,
        handlePostAddRecruit,
        handlePutUpdateRecruit
      }}
    >
      {children}
    </RecruitContexts.Provider>
  );
};

export const RecruitContext = (): RecruitContextType => {
  const context = useContext(RecruitContexts);
  if (!context) {
    return {} as RecruitContextType;
  }
  return context;
};
