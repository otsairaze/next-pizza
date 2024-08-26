import { Ingredient, ProductItem } from "@prisma/client";
import { calcTotalPizzaPrice } from ".";
import { mapPizzaType, PizzaSize, PizzaType } from "../constants/pizza";

export const getPizzaDetails = (
  type: PizzaType,
  size: PizzaSize,
  items: ProductItem[],
  ingredient: Ingredient[],
  selectedIngredients: Set<number>
) => {
  const totalPrice = calcTotalPizzaPrice(
    type,
    size,
    items,
    ingredient,
    selectedIngredients
  );
  const textDetails = `${size} см, ${mapPizzaType[type]} пицца`;

  return { totalPrice, textDetails };
};
