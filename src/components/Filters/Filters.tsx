import React, { useState } from "react";
import FilterOptions from "../../types/FilterOption";

interface FiltersProps {
  onFilterChange: (
    ingredients: string[] | null,
    filters: FilterOptions
  ) => void;
}

const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<FilterOptions>({
    diet: "",
    cuisine: "",
    mealType: "",
    maxReadyTime: "",
  });

  const handleChange = (key: keyof FilterOptions, value: string): void => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(null, newFilters);
  };

  const dietOptions = [
    { value: "", label: "Any Diet" },
    { value: "vegetarian", label: "Vegetarian" },
    { value: "vegan", label: "Vegan" },
    { value: "gluten-free", label: "Gluten Free" },
    { value: "keto", label: "Keto" },
    { value: "paleo", label: "Paleo" },
  ];

  const cuisineOptions = [
    { value: "", label: "Any Cuisine" },
    { value: "italian", label: "Italian" },
    { value: "mexican", label: "Mexican" },
    { value: "asian", label: "Asian" },
    { value: "mediterranean", label: "Mediterranean" },
    { value: "american", label: "American" },
  ];

  const mealTypeOptions = [
    { value: "", label: "Any Type" },
    { value: "breakfast", label: "Breakfast" },
    { value: "main course", label: "Main Course" },
    { value: "appetizer", label: "Appetizer" },
    { value: "dessert", label: "Dessert" },
    { value: "salad", label: "Salad" },
    { value: "soup", label: "Soup" },
  ];

  return (
    <div className="mt-3 p-6 bg-white rounded-xl shadow-md">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Refine Results</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Diet
          </label>
          <select
            value={filters.diet}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              handleChange("diet", e.target.value)
            }
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
          >
            {dietOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cuisine
          </label>
          <select
            value={filters.cuisine}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              handleChange("cuisine", e.target.value)
            }
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
          >
            {cuisineOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Meal Type
          </label>
          <select
            value={filters.mealType}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              handleChange("mealType", e.target.value)
            }
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
          >
            {mealTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Max Prep Time
          </label>
          <div className="relative">
            <input
              type="number"
              placeholder="30"
              min="5"
              max="180"
              value={filters.maxReadyTime}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange("maxReadyTime", e.target.value)
              }
              className="w-full pl-3 pr-12 py-2 rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
              min
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
