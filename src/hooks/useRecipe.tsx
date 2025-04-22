import { useState } from "react";
import spoonacularApi from "../api/axios";
import Recipe from "../models/Recipe";
import FilterOptions from "../types/FilterOption";

const useRecipe = () => {
  // Loading State
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Recipe State
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  // Search Recipes
  const searchRecipes = async (
    ingredients: string[] | string,
    filters: FilterOptions
  ) => {
    setLoading(true);
    try {
      const response = await spoonacularApi.get("/recipes/findByIngredients", {
        params: {
          ingredients:
            typeof ingredients === "string"
              ? ingredients
              : ingredients.join(","),
          number: 12,
          ...filters,
        },
      });

      setRecipes(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setError("Something is wrong when fetching recipies.");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    recipes,
    searchRecipes,
  };
};

export default useRecipe;
