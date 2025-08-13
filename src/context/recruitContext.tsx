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
  const [listType, setListType] = useState<any[]>([
    { id: 1, name: "Toàn thời gian", status: true, created_on: "2025-01-01", updated_at: "2025-01-01" },
    { id: 2, name: "Bán thời gian", status: true, created_on: "2025-01-01", updated_at: "2025-01-01" },
    { id: 3, name: "Hợp đồng", status: true, created_on: "2025-01-01", updated_at: "2025-01-01" },
    { id: 4, name: "Freelance", status: true, created_on: "2025-01-01", updated_at: "2025-01-01" }
  ]);
  const [listTags, setListTags] = useState<any[]>([
    { id: "1", name: "Võ thuật" },
    { id: "2", name: "Lái xe" },
    { id: "3", name: "Tiếng Anh" },
    { id: "4", name: "Quản lý" },
    { id: "5", name: "Sự kiện" },
    { id: "6", name: "Du lịch" },
    { id: "7", name: "Sơ cứu" },
    { id: "8", name: "Thể lực tốt" }
  ]);
  const [listRecruit, setListRecruit] = useState([
    {
      id: "1",
      title: "Vệ sĩ cá nhân cho doanh nhân",
      company: "VIP Security Services",
      location: "TP. Hồ Chí Minh",
      salary: "25-35 triệu/tháng",
      type: "1",
      description: "Tuyển vệ sĩ có kinh nghiệm bảo vệ doanh nhân thành đạt. Yêu cầu có kỹ năng võ thuật, lái xe và khả năng xử lý tình huống khẩn cấp.",
      requirements: "Kinh nghiệm 3+ năm, võ thuật, lái xe",
      benefits: "Bảo hiểm, thưởng tết, đào tạo",
      experience: "3+ năm",
      education: "Trung cấp",
      tags: [
        { id: "1", name: "Võ thuật" },
        { id: "2", name: "Lái xe" },
        { id: "3", name: "Tiếng Anh" }
      ],
      deadline: "2025-02-28",
      posted: "2025-01-15",
      status: "active",
      submited: "active",
      applicants: [
        {
          id: "1",
          name: "Nguyễn Văn A",
          email: "nguyenvana@email.com",
          phone: "0901234567",
          age: 28,
          experience: "5 năm kinh nghiệm bảo vệ",
          education: "Trung cấp",
          tags: ["1", "2"],
          applied_date: "2025-01-16",
          status: "pending"
        }
      ]
    },
    {
      id: "2",
      title: "Trưởng đội bảo vệ",
      company: "Elite Security Group",
      location: "Hà Nội",
      salary: "40-60 triệu/tháng",
      type: "1",
      description: "Tuyển trưởng đội bảo vệ có kinh nghiệm quản lý và điều hành đội ngũ vệ sĩ chuyên nghiệp.",
      requirements: "Kinh nghiệm 5+ năm, quản lý đội nhóm",
      benefits: "Lương cao, thưởng hiệu suất",
      experience: "5+ năm",
      education: "Cao đẳng",
      tags: [
        { id: "4", name: "Quản lý" },
        { id: "3", name: "Tiếng Anh" }
      ],
      deadline: "2025-03-15",
      posted: "2025-01-10",
      status: "active",
      submited: null,
      applicants: []
    },
    {
      id: "3",
      title: "Vệ sĩ sự kiện",
      company: "Event Security Pro",
      location: "Toàn quốc",
      salary: "500k-1tr/ngày",
      type: "2",
      description: "Tuyển vệ sĩ bảo vệ các sự kiện lớn, concert và hoạt động của nghệ sĩ nổi tiếng.",
      requirements: "Linh hoạt, có thể đi công tác",
      benefits: "Phụ cấp đi lại, được gặp nghệ sĩ",
      experience: "1+ năm",
      education: "Trung học",
      tags: [
        { id: "5", name: "Sự kiện" },
        { id: "6", name: "Du lịch" }
      ],
      deadline: "2025-02-20",
      posted: "2025-01-12",
      status: "active",
      submited: "inactive",
      applicants: [
        {
          id: "2",
          name: "Trần Thị B",
          email: "tranthib@email.com",
          phone: "0987654321",
          age: 25,
          experience: "2 năm kinh nghiệm bảo vệ sự kiện",
          education: "Trung cấp",
          tags: ["5"],
          applied_date: "2025-01-13",
          status: "reviewed"
        },
        {
          id: "3",
          name: "Lê Văn C",
          email: "levanc@email.com",
          phone: "0912345678",
          age: 30,
          experience: "4 năm kinh nghiệm bảo vệ",
          education: "Cao đẳng",
          tags: ["5", "6"],
          applied_date: "2025-01-14",
          status: "pending"
        }
      ]
    }
  ]);

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
