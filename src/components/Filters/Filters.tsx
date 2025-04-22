import React from "react";
import { ChevronDown } from "lucide-react"; // Optional icon for styling
import FilterOptions from "../../types/FilterOption";

interface FiltersProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

const Filters: React.FC<FiltersProps> = ({ filters, onFilterChange }) => {

  const handleChange = (key: keyof FilterOptions, value: any): void => {
    onFilterChange({ ...filters, [key]: value });
  };

  const numberOptions: number[] = [5, 10, 15, 20, 50, 100];
  const rankingOptions: { label: string; value: number }[] = [
    { label: "Rank 1", value: 1 },
    { label: "Rank 2", value: 2 },
  ];

  const renderSelect = (
    label: string,
    value: string | number,
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    options: { label: string; value: string | number }[]
  ) => (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        value={value}
        onChange={onChange}
        className="appearance-none w-full pl-4 pr-10 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500 text-sm"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-9 h-4 w-4 text-gray-500 pointer-events-none" />
    </div>
  );

  return (
    <div className="mt-3 p-6 bg-white rounded-xl shadow-md">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Filter Results</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {renderSelect(
          "Max Number of Recipes",
          filters.maxNumber,
          (e) => handleChange("maxNumber", parseInt(e.target.value)),
          numberOptions.map((num) => ({ label: num.toString(), value: num }))
        )}

        {renderSelect(
          "Ranking",
          filters.ranking,
          (e) => handleChange("ranking", parseInt(e.target.value)),
          rankingOptions
        )}
      </div>
    </div>
  );
};

export default Filters;
