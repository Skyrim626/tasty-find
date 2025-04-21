
import { Plus, Search } from 'lucide-react';
import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (value: any) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [ingredients, setIngredients] = useState<any>([]);
  const [currentIngredient, setCurrentIngredient] = useState('');

  const addIngredient = (e: any) => {
    e.preventDefault();
    if (currentIngredient.trim() && !ingredients.includes(currentIngredient.trim())) {
      setIngredients([...ingredients, currentIngredient.trim()]);
      setCurrentIngredient('');
    }
  };

  const removeIngredient = (ingredient: any) => {
    setIngredients(ingredients.filter((i: any) => i !== ingredient));
  };

  const handleSearch = () => {
    if (ingredients.length > 0) {
      onSearch(ingredients);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={addIngredient} className="flex gap-2">
        <input
          type="text"
          value={currentIngredient}
          onChange={(e) => setCurrentIngredient(e.target.value)}
          placeholder="Enter an ingredient"
          className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
        >
          <Plus className="h-5 w-5" />
        </button>
      </form>

      <div className="flex flex-wrap gap-2">
        {ingredients.map((ingredient: any) => (
          <span
            key={ingredient}
            className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 flex items-center gap-1"
          >
            {ingredient}
            <button
              onClick={() => removeIngredient(ingredient)}
              className="hover:text-blue-600"
            >
              ×
            </button>
          </span>
        ))}
      </div>

      <button
        onClick={handleSearch}
        disabled={ingredients.length === 0}
        className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <Search className="h-5 w-5" />
        Search Recipes
      </button>
    </div>
  );
};

export default SearchBar;
