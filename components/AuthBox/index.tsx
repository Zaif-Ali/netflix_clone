"use client";
import Input from "../Input";
import { useCallback, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

interface SharedInputData {
  email: string;
  password: string;
}
type Variant = "Sign in" | "Register";

interface RegisterData extends SharedInputData {
  username: string;
}

const AuthBox = () => {
  // is auth for login or create a new acccount
  const [varient, setvarient] = useState<Variant>("Sign in");

  // state to handle the input data
  const [data, setdata] = useState<SharedInputData | RegisterData>({
    email: "",
    password: "",
    username: "",
  });

  // handle data input on change
  const handle_Input_State = (e: any) => {
    setdata((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.value,
    }));
  };

  // change varient
  const chnageContext = useCallback(() => {
    setvarient((current) => (current === "Register" ? "Sign in" : "Register"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-black/90 bg-opacity-70 px-12 py-16 self-center mt-2 lg:w-2/3 lg:max-w-md rounded-md w-full mb-3">
      <h2 className="text-gray-50 text-4xl mb-8 font-semibold">{varient}</h2>
      <div className="flex flex-col gap-4">
        {varient === "Register" && (
          <Input
            id="username"
            label="username"
            type="text"
            name="username"
            value={(data as RegisterData).username}
            onChange={handle_Input_State}
          />
        )}
        <Input
          id="email"
          label="email"
          type="email"
          name="email"
          value={data.email}
          onChange={handle_Input_State}
        />
        <Input
          id="password"
          label="password"
          type="password"
          name="password"
          value={data.password}
          onChange={handle_Input_State}
        />
      </div>
      <button
        onClick={() => console.log(data)}
        className="bg-red-600 py-3 text-white rounded-md w-full mt-6 hover:bg-red-700 transition"
      >
        {varient === "Register" ? "Create a account" : "Login"}
      </button>
      {/* Divider  */}
      <div className="inline-flex items-center justify-center w-full ">
        <hr className="w-64 h-px my-8 border-0 bg-gray-700" />
        <span className=" absolute px-8 font-medium  -translate-x-1/2  left-1/2 text-gray-100/60 ">
          or
        </span>
      </div>
      {/* Divider End  */}
      {/* social buttons  */}
      <div className="flex flex-row items-center gap-4 mt-3 justify-center">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
          <FcGoogle size={32} />
        </div>
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
          <FaGithub size={32} />
        </div>
      </div>
      {/* social buttons end */}
      <p className="text-neutral-500 mt-7">
        {varient === "Sign in"
          ? "First time using Netflix?"
          : "Already have an account?"}
        <span
          onClick={chnageContext}
          className="text-white ml-1 hover:underline cursor-pointer hover:text-red-500/70"
        >
          {varient === "Sign in" ? "Create an account" : "Login"}
        </span>
        .
      </p>
    </div>
  );
};

export default AuthBox;
