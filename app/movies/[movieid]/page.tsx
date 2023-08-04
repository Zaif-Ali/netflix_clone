/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import useMovie from "@/hooks/useMovie";
import { useRouter } from "next/navigation";

const movies = ({ params }: { params: any }) => {
  const router = useRouter();
  const { movieid } = params;
  const { data } = useMovie(movieid as string);
  
  return (
    <div className="h-screen w-screen bg-black">
      <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
        <AiOutlineArrowLeft
          onClick={() => router.push("/movies")}
          className="w-4 md:w-10 text-white cursor-pointer hover:opacity-80 transition"
        />
        <p className="text-white text-1xl md:text-3xl font-bold">
          <span className="font-light">Watching:</span>
          {data?.movies.title}
        </p>
      </nav>
      <video className="h-full w-full" autoPlay controls src={data?.movies.videoUrl}></video>
    </div>
  );
};

export default movies;
