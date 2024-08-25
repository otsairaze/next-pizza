import { Ingredient, ProductItem } from "@prisma/client";
import { PizzaSize, PizzaType } from "../constants/pizza";

export const calcTotalPizzaPrice = (
  type: PizzaType,
  size: PizzaSize,
  items: ProductItem[],
  ingredient: Ingredient[],
  selectedIngredients: Set<number>
) => {
  const pizzaPrice =
    items.find((item) => item.pizzaType === type && item.size === size)
      ?.price || 0;

  const totalIngredientsPrice = ingredient
    .filter((item) => selectedIngredients.has(item.id))
    .reduce((acc, item) => acc + item.price, 0);

  return pizzaPrice + totalIngredientsPrice;
};
