
import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardPenIcon, Heart, HeartHandshake, Link } from 'lucide-react';

interface RecipeCardProps {
  recipe: any;
  isFavorite: boolean;
  onFavoriteClick: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, isFavorite, onFavoriteClick }) => {
  const copyIngredients = () => {
    const text = recipe.missedIngredients
      .concat(recipe.usedIngredients)
      .map((ing: any) => ing.original)
      .join('\n');
    navigator.clipboard.writeText(text);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-white rounded-xl shadow-md overflow-hidden"
    >
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900">{recipe.title}</h3>
          <button
            onClick={onFavoriteClick}
            className="text-red-500 hover:text-red-600"
          >
            {isFavorite ? (
              <HeartHandshake className="h-6 w-6" />
            ) : (
              <Heart className="h-6 w-6" />
            )}
          </button>
        </div>

        <div className="mt-4 space-y-2">
          <h4 className="font-medium text-gray-900">Ingredients:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {recipe.usedIngredients.map((ing: any) => (
              <li key={ing.id} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                {ing.original}
              </li>
            ))}
            {recipe.missedIngredients.map((ing: any) => (
              <li key={ing.id} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                {ing.original}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={copyIngredients}
            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200"
          >
            <ClipboardPenIcon className="h-4 w-4" />
            Copy
          </button>
          <a
            href={recipe.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-500 rounded-lg text-sm font-medium text-white hover:bg-blue-600"
          >
            <Link className="h-4 w-4" />
            Full Recipe
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default RecipeCard;
