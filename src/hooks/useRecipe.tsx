// useRecipe.ts
import { useState, useCallback } from "react";
import spoonacularApi from "../api/axios";
import Recipe from "../models/Recipe";
import FilterOptions from "../types/FilterOption";
import { isApiLimitError } from "../utils/errorHandling";

const useRecipe = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isQuotaExceeded, setIsQuotaExceeded] = useState<boolean>(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const searchRecipes = useCallback(async (
    ingredients: string[] | string,
    filters: FilterOptions
  ) => {
    // Check if we already know the quota is exceeded
    if (isQuotaExceeded) {
      return;
    }

    setLoading(true);
    try {
      const response = await spoonacularApi.get("/recipes/findByIngredients", {
        params: {
          ingredients:
            typeof ingredients === "string"
              ? ingredients
              : ingredients.join(","),
          number: filters.maxNumber,
          ranking: filters.ranking,
        },
      });

      setRecipes(response.data);
      setError("");
    } catch (error: any) {
      console.error("Error fetching recipes:", error);
      
      if (isApiLimitError(error)) {
        setIsQuotaExceeded(true);
        setError("API daily limit reached. Recipe search is unavailable at the moment.");
      } else {
        setError("Something went wrong when fetching recipes.");
      }
    } finally {
      setLoading(false);
    }
  }, [isQuotaExceeded]);

  return {
    loading,
    error,
    recipes,
    searchRecipes,
    isQuotaExceeded
  };
};

export default useRecipe;