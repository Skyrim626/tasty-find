// src/models/MissedIngredient.ts
import Ingredient from "./Ingredient";

export default interface MissedIngredient extends Ingredient {
  extendedName: string;
}
