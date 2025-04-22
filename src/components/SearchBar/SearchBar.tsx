import { Plus, Search, X } from "lucide-react";
import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (ingredients: string[]) => void;
  onFocusChange: (focused: boolean) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onFocusChange,
}) => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [currentIngredient, setCurrentIngredient] = useState<string>("");

  const addIngredient = (e: React.FormEvent): void => {
    e.preventDefault();
    if (
      currentIngredient.trim() &&
      !ingredients.includes(currentIngredient.trim())
    ) {
      setIngredients([...ingredients, currentIngredient.trim()]);
      setCurrentIngredient("");
    }
  };

  const removeIngredient = (ingredient: string): void => {
    setIngredients(ingredients.filter((i) => i !== ingredient));
  };

  const handleSearch = (): void => {
    if (ingredients.length > 0) {
      onSearch(ingredients);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <form onSubmit={addIngredient} className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={currentIngredient}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCurrentIngredient(e.target.value)
            }
            onFocus={() => onFocusChange(true)}
            onBlur={() => onFocusChange(false)}
            placeholder="Add an ingredient (e.g., eggs, bacon, cheese)"
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
        </div>
        <button
          type="submit"
          className="p-3 rounded-lg bg-amber-500 text-white hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
        >
          <Plus className="h-5 w-5" />
        </button>
      </form>

      {ingredients.length > 0 && (
        <>
          <div className="mt-4 flex flex-wrap gap-2">
            {ingredients.map((ingredient) => (
              <span
                key={ingredient}
                className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 flex items-center gap-1"
              >
                {ingredient}
                <button
                  onClick={() => removeIngredient(ingredient)}
                  className="ml-1 hover:text-amber-900"
                >
                  <X className="h-4 w-4" />
                </button>
              </span>
            ))}
          </div>

          <button
            onClick={handleSearch}
            className="mt-4 w-full py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 font-medium flex items-center justify-center"
          >
            <Search className="mr-2 h-5 w-5" />
            Find Recipes
          </button>
        </>
      )}
    </div>
  );
};

export default SearchBar;
