"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { getRole, getUserInfo, postLogin, postSignUp } from "../service/api";
import { useRouter } from "next/navigation";

type AuthContextType = {
  listRole: any[];
  handlePostSignUp: any;
  handlePostLogin: any;
  userInfo: any;
  setUserInfo: any;
  handleGetUserInfo: any;
};

const AuthContexts = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [listRole, setListRole] = useState<any[]>([]);
  const [userInfo, setUserInfo] = useState<any>(null);

  const handleGetListRole = async () => {
    try {
      const res = await getRole();
      if (res) {
        setListRole(res.data.data);
      }
    } catch (error) {
      console.error("Error handleGetListRole", error);
    }
  };

  const handlePostSignUp = async (
    name: any,
    email: any,
    password: any,
    role: any
  ) => {
    try {
      const res = await postSignUp(name, email, password, role);
      if (res) {
        alert("Đăng ký thành công! Vui lòng đăng nhập.");
      }
    } catch (error) {
      return error;
    }
  };

  const handlePostLogin = async (username: any, password: any) => {
    try {
      const res = await postLogin(username, password);
      if (res) {
        localStorage.setItem("userToken", res.data.data.accessToken)
        await handleGetUserInfo(res.data.data.accessToken);
        alert("Đăng nhập thành công!");
        if(res.data.data.id_role === 1) {
          router.push("/cms/home");
        } else {
          router.push("/");
        }
      }
    } catch (error) {
      return error;
    }
  };

  const handleGetUserInfo = async (token: string) => {
    try {
      const res = await getUserInfo(token);
      if(res){
        setUserInfo(res.data.data);
        
      }
    } catch (error) {
      return error;
    }
  }

  useEffect(() => {
    handleGetListRole();
  }, []);
  return (
    <AuthContexts.Provider
      value={{
        listRole,
        handlePostSignUp,
        handlePostLogin,
        userInfo,
        setUserInfo,
        handleGetUserInfo
      }}
    >
      {children}
    </AuthContexts.Provider>
  );
};

export const AuthContext = (): AuthContextType => {
  const context = useContext(AuthContexts);
  if (!context) {
    return {} as AuthContextType;
  }
  return context;
};
