import MissedIngredient from "./MissedIngredient";
import UnusedIngredient from "./UnusedIngredient";
import UsedIngredient from "./UsedIngredient";

// src/models/Recipe.ts
export default interface Recipe {
  id: number;
  title: string;
  image: string;
  imageType: string;
  usedIngredientCount: number;
  missedIngredientCount: number;
  missedIngredients: MissedIngredient[];
  usedIngredients: UsedIngredient[];
  unusedIngredients: UnusedIngredient[];
  likes: number;
}