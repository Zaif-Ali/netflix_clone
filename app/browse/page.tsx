"use client";
import useCurrentUser from "@/hooks/useCurrentUser";
import { NextPage } from "next";
import { typeresponse } from "../api/current/route";
import { useRouter } from "next/navigation";
import UserCard from "@/components/Profile/UserCard";
import React from "react";

interface Props {}

const Index: NextPage<Props> = ({}) => {
  const router = useRouter();
  const { data, isLoading }: { data: typeresponse; isLoading: boolean } =
    useCurrentUser();
  if (isLoading) {
    return <div>loading</div>;
  }
  return (
    <div className="flex items-center md:h-full justify-center">
      <div className="flex flex-col mt-5 pb-5">
        <h1 className="text-3xl md:text-6xl text-white text-center">
          Who&#39;s watching?
        </h1>
        <div className=" mt-4 md:mt-10 flex justify-center items-center">
          <div className="flex items-center justify-center gap-8 mt-4 md:mt-10 ">
            <div className="flex flex-col md:flex-row md:flex-wrap justify-center items-center space-x-3">
              {data.profiles.map((p, i) => (
                <React.Fragment key={i}>
                  <UserCard name={p.name} avatar={p.avatar} profileid={p._id} />
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
