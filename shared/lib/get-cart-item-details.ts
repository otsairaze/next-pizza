import { Ingredient } from "@prisma/client";
import { mapPizzaType, PizzaSize, PizzaType } from "../constants/pizza";
import { CartStateItem } from "./get-cart-details";

export const getCartItemDetails = (
  ingredient: CartStateItem["ingredient"],
  pizzaType: PizzaType,
  pizzaSize: PizzaSize
): string => {
  const details = [];

  if (pizzaSize && pizzaType) {
    const typeName = mapPizzaType[pizzaType];
    details.push(`${typeName} см, ${pizzaSize} пицца`);
  }

  if (ingredient) {
    details.push(...ingredient.map((item) => item.name));
  }

  return details.join(", ");
};
