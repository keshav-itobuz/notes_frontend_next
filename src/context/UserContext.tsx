import catchError from "@/app/lib/catch-error";
import {
  LoginUserQuery,
  LoginUserQueryVariables,
  RegisterUserMutation,
  RegisterUserMutationVariables,
  UploadImageMutation,
  UploadImageMutationVariables,
  User,
} from "@/graphql/graphql";
import {
  register_user_mutation,
  upload_profile_image_mutation,
} from "@/graphql/user.mutation";
import { login_user_query } from "@/graphql/user.query";
import { LoginFormType } from "@/Types/NotesType";
import { useLazyQuery, useMutation } from "@apollo/client";
import React, {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "react-toastify";

type userContextType = {
  user: User | null;
  handleLogin: (data: LoginFormType) => void;
  handleRegister: (data: LoginFormType) => void;
  handleLogout: () => void;
  handleProfileImageUpload: (data: File) => void;
};

const UserContext = createContext<userContextType>({
  user: null,
  handleLogin: () => {},
  handleRegister: () => {},
  handleLogout: () => {},
  handleProfileImageUpload: () => {},
});
export function UserProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [user, setUser] = useState<User | null>(null);

  const [loginUser] = useLazyQuery<LoginUserQuery, LoginUserQueryVariables>(
    login_user_query,
    {
      fetchPolicy: "network-only",
      notifyOnNetworkStatusChange: true,
      onCompleted: (data) => {
        if (data?.loginUser?.data?.user) {
          localStorage.setItem(
            "token",
            JSON.stringify(data?.loginUser?.data.token)
          );
          setUser(data?.loginUser?.data?.user);
        }
      },
      onError(error) {
        catchError(error, true);
      },
    }
  );

  const [registerUser] = useMutation<
    RegisterUserMutation,
    RegisterUserMutationVariables
  >(register_user_mutation, {
    onCompleted: (data) => {
      if (data?.registerUser?.data?.user) {
        localStorage.setItem(
          "token",
          JSON.stringify(data?.registerUser?.data.token)
        );
        setUser(data?.registerUser?.data?.user);
      }
    },
    onError(error) {
      catchError(error, true);
    },
  });

  const [uploadProfileImage] = useMutation<
    UploadImageMutation,
    UploadImageMutationVariables
  >(upload_profile_image_mutation, {
    onCompleted: () => {
      loginUser();
      toast.success("profile image updated successful");
    },
    onError(error) {
      catchError(error, true);
    },
  });

  function handleProfileImageUpload(data: File) {
    uploadProfileImage({ variables: { file: data } });
  }

  function handleLogin(data: LoginFormType) {
    loginUser({ variables: { email: data.email, password: data.password } });
  }

  function handleRegister(data: LoginFormType) {
    registerUser({
      variables: {
        name: data.name!,
        email: data.email,
        password: data.password,
      },
    });
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/";
  }

  useEffect(() => {
    const data = localStorage.getItem("token");
    if (data) {
      loginUser();
    }
  }, []);
  const value = useMemo(
    () => ({
      user,
      handleLogin,
      handleLogout,
      handleRegister,
      handleProfileImageUpload,
    }),
    [user]
  );
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserContext;
