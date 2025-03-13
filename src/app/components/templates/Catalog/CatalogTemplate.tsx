"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import GenreFilter from "@/app/components/molecules/GenreFilter/GenreFilter";
import GameGrid from "@/app/components/organisms/GameGrid/GameGrid";
import SeeMoreButton from "@/app/components/molecules/SeeMoreButton/SeeMoreButton";
import Spinner from "@/app/components/atoms/Spinner/Spinner";
import { fetchGames } from "@/services/gameService";
import type { Game } from "@/utils/endpoint";

const CatalogTemplate = () => {
  const searchParams = useSearchParams();
  const genre = searchParams.get("genre") || "";
  const page = Number.parseInt(searchParams.get("page") || "1");

  const [games, setGames] = useState<Game[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(page);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadGames = async () => {
      setIsLoading(true);
      try {
        const data = await fetchGames(genre, page);
        setGames(data.games);
        setGenres(data.availableFilters);
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);
      } catch (error) {
        console.error("Failed to load games:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadGames();
  }, [genre, page]);

  return (
    <div className="max-w-[1280px] mx-auto px-16">
      <div className="py-8">
        <h2 className="text-[36px] font-bold text-primary mb-6">Top Sellers</h2>
        <div className="flex justify-end mb-4">
          <GenreFilter genres={genres} />
        </div>
        <div className="h-px bg-primary bg-opacity-10 w-full" />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner size="lg" />
        </div>
      ) : (
        <>
          <GameGrid games={games} />
          <SeeMoreButton totalPages={totalPages} currentPage={currentPage} />
        </>
      )}
    </div>
  );
};

export default CatalogTemplate;
