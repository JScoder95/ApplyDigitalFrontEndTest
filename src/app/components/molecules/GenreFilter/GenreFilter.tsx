"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

interface GenreFilterProps {
  genres: string[];
}

const GenreFilter = ({ genres }: GenreFilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentGenre = searchParams.get("genre") || "";
  const [selectedGenre, setSelectedGenre] = useState(currentGenre);

  useEffect(() => {
    setSelectedGenre(currentGenre);
  }, [currentGenre]);

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const genre = e.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (genre) {
      params.set("genre", genre);
    } else {
      params.delete("genre");
    }

    params.set("page", "1"); // Reset to page 1 when changing genre
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="relative flex items-center text-lg mb-12">
      <span className="text-primary font-bold">Genre</span>
      <span className="mx-3 text-primary text-opacity-20">
        <div className="w-[1px] h-[22px] bg-current"></div>
      </span>
      <div className="relative">
        <select
          value={selectedGenre}
          onChange={handleGenreChange}
          className="appearance-none bg-transparent pr-8 text-primary font-normal focus:outline-none cursor-pointer"
        >
          <option value="">All</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
          <ChevronDown className="h-5 w-5 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default GenreFilter;
