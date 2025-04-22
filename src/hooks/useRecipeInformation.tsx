import { useCallback, useState } from "react";
import RecipeInformation from "../models/RecipeInformation";
import spoonacularApi from "../api/axios";
import { isApiLimitError } from "../utils/errorHandling";

const useRecipeInformation = () => {
  // Loading State
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isQuotaExceeded, setIsQuotaExceeded] = useState<boolean>(false);

  // Recipe State
  const [recipeInformation, setRecipeInformation] =
    useState<RecipeInformation>();

  const getRecipeInformation = useCallback(
    async (
      id: string | number,
      recipeInformationFilter: {
        includeNutrition: boolean;
        addWinePairing: boolean;
        addTasteData: boolean;
      }
    ) => {
      // Check if we already know the quota is exceeded
      if (isQuotaExceeded) {
        return;
      }

      setLoading(true);

      try {
        const response = await spoonacularApi.get(
          `/recipes/${id}/information`,
          {
            params: {
              ...recipeInformationFilter,
            },
          }
        );

        setRecipeInformation(response.data);
        setError("");
      } catch (error: any) {
        console.error("Error fetching recipe information:", error);

        if (isApiLimitError(error)) {
          setIsQuotaExceeded(true);
          setError(
            "API daily limit reached. Recipe details are unavailable at the moment."
          );
        } else {
          setError("Something went wrong when fetching recipe information.");
        }
      } finally {
        setLoading(false);
      }
    },
    [isQuotaExceeded]
  );

  return {
    loading,
    error,
    isQuotaExceeded,
    recipeInformation,
    getRecipeInformation,
  };
};

export default useRecipeInformation;
