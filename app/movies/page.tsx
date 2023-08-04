/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import BillBoard from "@/components/BillBoard";
import MovieList from "@/components/movies/MovieList";
import Navbar from "@/components/nav/Navbar";
import useInfoModalStore from "@/hooks/useInfoModalStore";
import useMoviesList from "@/hooks/useMovieList";
import React from "react";

const page = () => {
  const { data: datamovies = { success: Boolean, movies: [] } } =
    useMoviesList();

  return (
    <div>
      <Navbar />
      <BillBoard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={datamovies.movies} />
      </div>
    </div>
  );
};

export default page;
