import { NextPage } from "next";

type InputProps = {
  id: "email" | "password" | "username";
  onChange: any;
  value: string;
  type: "email" | "password" | "text";
  label: "email" | "password" | "username";
  name: "email" | "password" | "username";
};

const Input: NextPage<InputProps> = ({
  id,
  label,
  onChange,
  type,
  value,
  name,
}) => {
  return (
    <div className="relative">
      <input
        className=" block rounded-md px-6 pt-6 pb-1 w-full text-md text-gray-900   appearance-none focus:outline-red-900 focus:ring-4 peer invalid:border-b-1  "
        id={id}
        name={name}
        onChange={onChange}
        type={type}
        value={value}
        autoComplete="off"
      />
      <label
        htmlFor="email"
        className="
        absolute 
        text-md
      text-zinc-400
        duration-150 
        transform 
        -translate-y-3 
        scale-75 
        top-4 
        z-10 
        origin-[0] 
        left-6
        peer-placeholder-shown:scale-100 
        peer-placeholder-shown:translate-y-0 
        peer-focus:scale-75
        peer-focus:-translate-y-3
      "
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
