"use client";

import { CartItemProps } from "./cart-item-details/cart-item-details.types";
import { cn } from "@/shared/lib/utils";
import { X } from "lucide-react";

import { CartItemInfo } from "./cart-item-details/cart-item-info";
import { CartItemDetailsImage } from "./cart-item-details/cart-item-details-image";
import { CartItemDetailsPrice } from "./cart-item-details/cart-item-details-price";
import { CartItemDetailsCountButton } from "./cart-item-details/cart-item-details-count-button";

interface Props extends CartItemProps {
  onClickCountButton?: (type: "plus" | "minus") => void;
  onClickRemove?: () => void;
  className?: string;
}

export const CheckoutItem: React.FC<Props> = ({
  name,
  price,
  imageUrl,
  quantity,
  details,
  className,
  onClickCountButton,
  onClickRemove,
}) => {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <div className="flex items-center gap-5 flex-1">
        <CartItemDetailsImage src={imageUrl} />
        <CartItemInfo name={name} details={details} className="w-1/2" />
      </div>

      <CartItemDetailsPrice value={price} />

      <div className="flex items-center gap-5 ml-20">
        <CartItemDetailsCountButton
          onClick={onClickCountButton}
          value={quantity}
        />
        <button onClick={onClickRemove}>
          <X
            className="text-gray-400 cursor-pointer hover:text-gray-600"
            size={20}
          />
        </button>
      </div>
    </div>
  );
};
