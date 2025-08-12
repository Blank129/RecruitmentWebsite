import axiosApiInstance from "./axios";
export const getRole = async () => {
  try {
    const res: any = await axiosApiInstance.get("/roles/signup");
    return res;
  } catch (error) {
    return error;
  }
};

export const postSignUp = async (
  name: any,
  email: any,
  password: any,
  role: any
) => {
  try {
    const res: any = await axiosApiInstance.post("/authenticate/signup", {
      name,
      email,
      password,
      role,
    });
    return res;
  } catch (error) {
    return error;
  }
};

export const postLogin = async (username: any, password: any) => {
  try {
    const res: any = await axiosApiInstance.post("/authenticate/login", {
      username,
      password,
    });
    return res;
  } catch (error) {
    return error;
  }
};

export const getUserInfo = async (token: string) => {
  try {
    const res: any = await axiosApiInstance.get("/authenticate/info", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    return error;
  }
};

export const getJobs = async () => {
  try {
    const res = await axiosApiInstance.get("/cms/jobs");
    return res.data;
  } catch (error) {
    throw error;
  }
};

// export const updateJobStatus = async (jobId: string, status: boolean) => {
//   try {
//     const res = await axiosApiInstance.put(`/cms/jobs/submit/${jobId}`, {
//       status: boolean,{
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     return res.data;
//   } catch (error) {
//     throw error;
//   }
// };
export const updateJobStatus = async (jobId: string, status: boolean) => {
  try {
    const token = localStorage.getItem("userToken");
    if (!token) {
      throw new Error("No authentication token found");
    }

    const res = await axiosApiInstance.put(
      `/cms/jobs/submit/${jobId}`,
      {
        submited: status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const updateJobStatusReject = async (jobId: string, status: boolean) => {
  try {
    const token = localStorage.getItem("userToken");
    if (!token) {
      throw new Error("No authentication token found");
    }

    const res = await axiosApiInstance.put(
      `/cms/jobs/reject/${jobId}`,
      {
        submited: status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
// const getAuthToken = (): string | null => {
//   if (typeof window !== "undefined") {
//     return (
//       localStorage.getItem("authToken") ||
//       localStorage.getItem("token") ||
//       localStorage.getItem("accessToken")
//     );
//   }
//   return null;
// };
// export const updateJobStatus = async (jobId: string, status: boolean) => {
//   try {
//     const token = getAuthToken();

//     if (!token) {
//       throw new Error("No authentication token found. Please login again.");
//     }

//     const res = await axiosApiInstance.put(
//       `/cms/jobs/submit/${jobId}`,
//       {
//         submited: status,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     return res.data;
//   } catch (error) {
//     throw error;
//   }
// };
