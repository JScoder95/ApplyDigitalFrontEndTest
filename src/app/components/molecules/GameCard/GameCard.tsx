"use client";

import React from "react";
import Image from "next/image";
import Badge from "@/app/components/atoms/Badge/Badge";
import Button from "@/app/components/atoms/Button/Button";
import Price from "@/app/components/atoms/Price/Price";
import type { Game } from "@/utils/endpoint";
import { useCartContext } from "@/context/CartContext";

interface GameCardProps {
  game: Game;
}

const GameCard = ({ game }: GameCardProps) => {
  const { isInCart, addToCart, removeFromCart } = useCartContext();
  const isGameInCart = isInCart(game.id);

  const handleCartAction = () => {
    if (isGameInCart) {
      removeFromCart(game.id);
    } else {
      addToCart(game);
    }
  };

  return (
    <div className="rounded-2xl border p-5 overflow-hidden bg-white w-full h-[436px] flex flex-col">
      <div className="relative flex-grow">
        <Image
          src={game.image || "/placeholder.svg"}
          alt={game.name}
          fill
          sizes="(max-width: 768px) 327px, 380px"
          className="object-cover rounded-t-2xl"
        />
        {game.isNew && (
          <div className="absolute top-3 left-3">
            <Badge text="NEW" variant="new" />
          </div>
        )}
      </div>

      <div className="font-bold uppercase text-primary tracking-wide mt-5">
        {game.genre.toUpperCase()}
      </div>
      <div className="flex justify-between items-center mt-1 mb-3">
        <h3 className="text-primary font-bold text-base truncate">
          {game.name}
        </h3>
        <Price
          value={game.price}
          className="text-primary text-base font-bold"
        />
      </div>
      <Button
        onClick={handleCartAction}
        variant="cart"
        size="lg"
        fullWidth
        className="rounded-xl border border-primary text-normal font-bold tracking-[0.5px] py-3"
      >
        {isGameInCart ? "REMOVE" : "ADD TO CART"}
      </Button>
    </div>
  );
};

export default GameCard;
