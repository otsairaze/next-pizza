"use client";

import { cn } from "@/shared/lib/utils";

import React, { useState } from "react";
import { PizzaImage } from "./pizza-image";
import { Title } from "./title";
import { Button } from "../ui";
import { GroupVariants } from "./group-variants";
import {
  mapPizzaType,
  PizzaSize,
  pizzaSizes,
  PizzaType,
  pizzaTypes,
} from "@/shared/constants/pizza";

import { IngredientItem } from "./ingredient-item";
import { Ingredient, ProductItem } from "@prisma/client";
import { useSet } from "react-use";
import { calcTotalPizzaPrice } from "@/shared/lib";

interface Props {
  imageUrl: string;
  name: string;
  ingredient: Ingredient[];
  items: ProductItem[];
  onClickAddCart?: VoidFunction;
  className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({
  imageUrl,
  name,
  ingredient,
  items,
  className,
  onClickAddCart,
}) => {
  const [size, setSize] = useState<PizzaSize>(20);
  const [type, setType] = useState<PizzaType>(1);

  const [selectedIngredients, { toggle: addIngredient }] = useSet(
    new Set<number>([])
  );

  const totalPrice = calcTotalPizzaPrice(
    type,
    size,
    selectedIngredients,
    items,
    ingredient
  );

  const textDetails = `${size} см, ${mapPizzaType[type]} пицца`;

  const filteredPizzasByType = items.filter((item) => item.pizzaType === type);
  const availablePizzas = pizzaSizes.map((item) => ({
    name: item.name,
    value: item.value,
    disabled: !filteredPizzasByType.some(
      (pizza) => Number(pizza.size) === Number(item.value)
    ),
  }));

  React.useEffect(() => {
    const isAvailableSize = availablePizzas?.find(
      (item) => Number(item.value) === size && !item.disabled
    );
    const availableSize = availablePizzas?.find((item) => !item.disabled);

    if (isAvailableSize && availableSize) {
      setSize(Number(availableSize.value) as PizzaSize);
    }
  }, [type]);

  const handleClickAdd = () => {
    onClickAddCart?.();
    console.log({
      size,
      type,
      ingredient: selectedIngredients,
    });
  };

  return (
    <div className={cn(className, "flex flex-1")}>
      <PizzaImage imageUrl={imageUrl} size={size} />

      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400">{textDetails}</p>

        <div className="flex flex-col gap-5 mt-5">
          <GroupVariants
            items={availablePizzaSizes}
            value={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
          />

          <GroupVariants
            items={pizzaTypes}
            value={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
          />
        </div>

        <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
          <div className="grid grid-cols-3 gap-3">
            {ingredient.map((item) => (
              <IngredientItem
                key={item.id}
                name={item.name}
                price={item.price}
                imageUrl={item.imageUrl}
                onClick={() => addIngredient(item.id)}
                active={selectedIngredients.has(item.id)}
              />
            ))}
          </div>
        </div>

        <Button
          onClick={handleClickAdd}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
        >
          Добавить в корзину за {totalPrice}
        </Button>
      </div>
    </div>
  );
};
