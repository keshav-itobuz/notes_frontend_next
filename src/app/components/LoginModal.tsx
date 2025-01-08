"use client";
import UserContext from "@/context/UserContext";
import { LoginFormType } from "@/Types/NotesType";
import { LoginFormValidationSchema } from "@/Validators/LoginFormValidationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useContext, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function LoginModal({
  setIsModalOpen,
}: Readonly<{
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>) {
  const [isRegistered, setIsRegisterd] = useState<boolean>(true);
  const { handleLogin, handleRegister } = useContext(UserContext);
  const form = useForm<LoginFormType>({
    resolver: yupResolver(LoginFormValidationSchema),
  });
  const { register } = form;

  function loginUser(data: LoginFormType) {
    handleLogin(data);
    setIsModalOpen(false);
  }
  function registerUser(data: LoginFormType) {
    handleRegister(data);
    setIsModalOpen(false);
    setIsRegisterd(true);
  }
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50">
      <div className="bg-white py-4 px-6 rounded-lg  w-96 h-fit pt-10 absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]">
        <FormProvider {...form}>
          <div>
            <h1 className="text-xl font-bold mb-3">
              {isRegistered ? "Login Here" : "Register Here"}
            </h1>
            <button
              className="absolute top-3 right-5 text-red-700 font-bold cursor-pointer"
              onClick={() => setIsModalOpen(false)}
            >
              X
            </button>
          </div>
          <div>
            {!isRegistered && (
              <div className="mb-4 relative">
                <input
                  className="w-full border p-2 rounded-lg mt-2"
                  placeholder="Name"
                  type="text"
                  {...register("name")}
                />
              </div>
            )}
            <div className="mb-4 relative">
              <input
                className="w-full border p-2 rounded-lg mt-2"
                placeholder="Email"
                type="email"
                {...register("email")}
              />
              {form.formState.errors.email && (
                <p className="text-red-600 text-[13px] h-fit absolute bottom-[-19px] left-1">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>
            <div className="mb-7 relative">
              <input
                className="w-full border p-2 rounded-lg mt-2"
                type="password"
                placeholder="Password"
                {...register("password")}
              />
              {form.formState.errors.password && (
                <p className="text-red-600 text-[13px] h-fit absolute bottom-[-19px] left-1">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>
          </div>
          <div>
            {isRegistered ? (
              <div className="flex flex-col justify-end mt-6 mb-2">
                <button
                  className="bg-blue-600 text-white p-2 rounded-lg"
                  onClick={form.handleSubmit((data) => {
                    loginUser(data);
                  })}
                >
                  Login
                </button>
                <div className="flex flex-row justify-end gap-2 mt-4 me-2 text-sm">
                  <span className="text-gray-400">
                    {"Didn't Registered Yet? "}
                  </span>
                  <button onClick={() => setIsRegisterd(false)}>
                    Register
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col justify-end mt-6 mb-2">
                <button
                  className="bg-blue-600 text-white p-2 rounded-lg"
                  onClick={form.handleSubmit((data) => {
                    registerUser(data);
                  })}
                >
                  SignUp
                </button>
                <div className="flex flex-row justify-end gap-2 mt-4 me-2 text-sm">
                  <span className="text-gray-400">
                    {"Already have an account?"}
                  </span>
                  <button onClick={() => setIsRegisterd(true)}>Login</button>
                </div>
              </div>
            )}
          </div>
        </FormProvider>
      </div>
    </div>
  );
}
