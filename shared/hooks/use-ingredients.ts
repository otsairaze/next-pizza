import { Api } from "@/shared/services/api-client";
import { Ingredient } from "@prisma/client";
import React, { useState } from "react";

export const useIngredients = () => {
  const [loading, setLoading] = useState(true);
  const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);

  React.useEffect(() => {
    async function fetchIngredients() {
      try {
        setLoading(true);
        const ingredients = await Api.ingredients.getAll();
        setIngredients(ingredients);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
    fetchIngredients();
  }, []);

  return {
    ingredients,
    loading,
  };
};
