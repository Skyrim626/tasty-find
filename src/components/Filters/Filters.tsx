
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface FiltersProps {
  onFilterChange: (value: any) => void;
}

const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    diet: '',
    maxReadyTime: '',
    type: '',
  });

  const dietOptions = [
    { value: '', label: 'Any' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'gluten-free', label: 'Gluten Free' },
  ];

  const mealTypes = [
    { value: '', label: 'Any' },
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'main course', label: 'Main Course' },
    { value: 'dessert', label: 'Dessert' },
  ];

  const handleFilterChange = (key: any, value: any) => {
    const newFilters: any = { ...selectedFilters, [key]: value };
    setSelectedFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4"
    >
      <select
        value={selectedFilters.diet}
        onChange={(e) => handleFilterChange('diet', e.target.value)}
        className="rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
        {dietOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <select
        value={selectedFilters.type}
        onChange={(e) => handleFilterChange('type', e.target.value)}
        className="rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
        {mealTypes.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Max ready time (minutes)"
        value={selectedFilters.maxReadyTime}
        onChange={(e) => handleFilterChange('maxReadyTime', e.target.value)}
        className="rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </motion.div>
  );
};

export default Filters;
