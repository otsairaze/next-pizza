import { CartItemDTO } from "../services/dto/cart.dto";

//TODO: Undefined ITEM

export const calcCartItemTotalPrice = (item: CartItemDTO): number => {
  const ingredientsPrice = item.ingredient.reduce(
    (acc, ingredient) => acc + ingredient.price,
    0
  );

  return (ingredientsPrice + item.productItem.price) * item.quantity;
};
