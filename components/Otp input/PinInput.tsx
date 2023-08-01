import { NextPage } from "next";
import React, { useEffect, useRef, useState } from "react";

interface Props {}
let currentOTP: number = 0;
const PinInput: NextPage<Props> = ({}) => {
  const [otp, setotp] = useState<string[]>(new Array(4).fill(""));
  const [activeOTPIndex, setactiveOTPIndex] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = target;
    const newotp: string[] = [...otp];
    newotp[currentOTP] = value.substring(value.length - 1);
    if (!value) setactiveOTPIndex(currentOTP - 1);
    else setactiveOTPIndex(currentOTP + 1);
    setotp(newotp);
  };

  const handleKeydown = (
    { key }: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    currentOTP = index;
    if (key === "Backspace") {
      setactiveOTPIndex(currentOTP - 1);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();

    // Check if the OTP is complete (all digits entered)
    if (activeOTPIndex === otp.length) {
      let fullOTP = otp.join(""); // Concatenate all OTP digits
      fullOTP = fullOTP.replace(/\s/g, "");
      if (fullOTP.length === 4) {
        console.log("Full OTP:", fullOTP);
      } 
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeOTPIndex]);

  return (
    <>
      {otp.map((_, index) => {
        return (
          <React.Fragment key={index}>
            <input
              type="text"
              ref={index === activeOTPIndex ? inputRef : null}
              className="w-12 h-12 border-2 rounded bg-transparent outline-none text-center font-semibold text-xl spin-button-none border-gray-400 focus:border-gray-700 focus:text-gray-700 text-gray-400 transition"
              value={otp[index]}
              onChange={handleChange}
              onKeyDown={(e) => handleKeydown(e, index)}
            />
          </React.Fragment>
        );
      })}
    </>
  );
};

export default PinInput;
