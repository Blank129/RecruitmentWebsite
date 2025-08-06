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