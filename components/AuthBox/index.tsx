"use client";
import Input from "../Input";
import { useCallback, useState } from "react";
import axios from "axios";
import {
  RegisterInputschema,
  LoginInputschema,
} from "@/lib/validation/valSchema";
import { useRouter } from "next/navigation";

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
  const { push } = useRouter();
  const Login = async () => {
    try {
      await LoginInputschema.validate(data);
      const res = await axios.post("/api/auth/login", data);
      const reSData = await res.data;
      if (reSData.success) {
        push("/browse");
      }
    } catch (error) {
      alert(error);
      return;
    }
  };

  // Register Function
  const register = async () => {
    try {
      await RegisterInputschema.validate(data);
      console.log("pass");
    } catch (error) {
      alert(error);
      return;
    }
    try {
      const res = await axios.post("/api/auth/register", data);
      console.log(res);
      const d = await res.data;
      if (d.success) {
        Login();
      }
    } catch (error: any) {
      alert(error.response.data.er);
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
        onClick={varient === "Register" ? register : Login}
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
