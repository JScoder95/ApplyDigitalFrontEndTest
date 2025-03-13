import React from "react";
import GameCard from "@/app/components/molecules/GameCard/GameCard";
import type { Game } from "@/utils/endpoint";

interface GameGridProps {
  games: Game[];
}

const GameGrid = ({ games }: GameGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[48px] justify-items-center">
      {games.map((game) => (
        <div key={game.id} className="w-full max-w-[327px] md:max-w-[380px]">
          <GameCard game={game} />
        </div>
      ))}
    </div>
  );
};

export default GameGrid;
