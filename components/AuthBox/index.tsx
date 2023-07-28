"use client";
import Input from "../Input";
import { useCallback, useState } from "react";
import axios from "axios";
import { isPasswordValid, isValidEmail } from "@/lib/Validations/Password";

interface SharedInputData {
  email: string;
  password: string;
}
type Variant = "Sign in" | "Register";

export interface RegisterData extends SharedInputData {
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
  const changeContext = useCallback(() => {
    setvarient((current) => (current === "Register" ? "Sign in" : "Register"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Register Function
  const register = async () => {
    const d = data as RegisterData;
    if (
      d.email.length > 4 &&
      d.password.length > 4 &&
      d.username.length > 4 &&
      isPasswordValid(d.password) &&
      isValidEmail(d.email)
    ) {
      try {
        const res = await axios.post("/api/auth/register", data);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Invalid");
    }
  };

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
        onClick={varient === "Register" ? register : () => console.log("login")}
        className="bg-red-600 py-3 text-white rounded-md w-full mt-6 hover:bg-red-700 transition
        disabled:opacity-50
        "
      >
        {varient === "Register" ? "Create a account" : "Login"}
      </button>

      <p className="text-neutral-500 mt-7">
        {varient === "Sign in"
          ? "First time using Netflix?"
          : "Already have an account?"}
        <span
          onClick={changeContext}
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
