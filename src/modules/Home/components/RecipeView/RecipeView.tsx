import React from "react";
import { X,  Clock, Copy, ArrowLeft } from "lucide-react";
import Recipe from "../../../../models/Recipe";

interface RecipeViewProps {
  recipe: Recipe;
  onClose: () => void;
}

const RecipeView: React.FC<RecipeViewProps> = ({ recipe, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  // Copy ingredients list to clipboard
  const copyIngredients = (): void => {
    const text = [...recipe.missedIngredients, ...recipe.usedIngredients]
      .map((ing) => ing.original)
      .join("\n");

    navigator.clipboard.writeText(text);
    
    // Show copied feedback
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header with image */}
      <div className="relative">
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center">
          <button 
            onClick={onClose}
            className="p-2 rounded-full bg-white/70 hover:bg-white text-gray-800 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button 
            onClick={onClose}
            className="p-2 rounded-full bg-white/70 hover:bg-white text-gray-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{recipe.title}</h1>
        
        {recipe.readyInMinutes && (
          <div className="flex items-center text-gray-600 mb-4">
            <Clock className="h-4 w-4 mr-1" />
            <span>{recipe.readyInMinutes} minutes</span>
          </div>
        )}

        {/* Ingredients */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Ingredients</h2>
            <button
              onClick={copyIngredients}
              className="flex items-center text-amber-600 hover:text-amber-700 text-sm font-medium"
            >
              <Copy className="h-4 w-4 mr-1" />
              {copied ? "Copied!" : "Copy List"}
            </button>
          </div>

          <div className="space-y-6">
            {/* Ingredients you have */}
            {recipe.usedIngredients && recipe.usedIngredients.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  Ingredients You Have:
                </h3>
                <ul className="space-y-2">
                  {recipe.usedIngredients.map((ing: any) => (
                    <li
                      key={ing.id}
                      className="text-sm text-gray-700 flex items-start"
                    >
                      <span className="inline-block w-2 h-2 rounded-full bg-green-500 mt-1.5 mr-2 flex-shrink-0" />
                      <span>
                        {ing.amount ? `${ing.amount} ${ing.unit || ''} ` : ''}
                        {ing.name || ing.original}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Ingredients you need */}
            {recipe.missedIngredients && recipe.missedIngredients.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  Ingredients You Need:
                </h3>
                <ul className="space-y-2">
                  {recipe.missedIngredients.map((ing: any) => (
                    <li
                      key={ing.id}
                      className="text-sm text-gray-700 flex items-start"
                    >
                      <span className="inline-block w-2 h-2 rounded-full bg-amber-500 mt-1.5 mr-2 flex-shrink-0" />
                      <span>
                        {ing.amount ? `${ing.amount} ${ing.unit || ''} ` : ''}
                        {ing.name || ing.original}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Instructions - normally would come from detailed API call */}
        {recipe.instructions ? (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Instructions</h2>
            <div className="prose prose-amber max-w-none" 
              dangerouslySetInnerHTML={{ __html: recipe.instructions }} 
            />
          </div>
        ) : (
          <div className="mt-8 p-4 bg-amber-50 rounded-lg border border-amber-100">
            <p className="text-amber-800">
              To see the full recipe instructions, please visit the recipe's website or check the API for complete details.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeView;