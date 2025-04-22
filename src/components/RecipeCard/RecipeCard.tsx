import { Copy, ExternalLink, Heart, Star } from "lucide-react";
import Recipe from "../../models/Recipe";
import { Bounce, toast } from "react-toastify";

interface RecipeCardProps {
  recipe: Recipe;
  isFavorite: boolean;
  onFavoriteClick: (recipe: Recipe) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  isFavorite,
  onFavoriteClick,
}) => {
  const copyIngredients = (): void => {
    const text = [...recipe.missedIngredients, ...recipe.usedIngredients]
      .map((ing) => ing.original)
      .join("\n");

    navigator.clipboard.writeText(text);
    // Would add toast notification here in a real app
    toast.success('📝 Ingredients Copied!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      });
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col">
      <div className="relative">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={() => onFavoriteClick(recipe)}
          className={`absolute top-3 right-3 p-2 rounded-full ${
            isFavorite ? "bg-amber-500 text-white" : "bg-white text-gray-600"
          } shadow hover:shadow-md transition-colors`}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
        </button>

        <div className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gradient-to-t from-black/70 to-transparent">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-amber-400" />
            <span className="ml-1 text-sm text-white font-medium">
              {recipe.likes} likes
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-medium text-gray-900 line-clamp-2">
          {recipe.title}
        </h3>

        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">
            Ingredients You Have:
          </h4>
          <ul className="space-y-1">
            {recipe.usedIngredients.map((ing) => (
              <li
                key={ing.id}
                className="text-sm text-gray-600 flex items-start"
              >
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 mt-1.5 mr-2 flex-shrink-0" />
                <span>{ing.original}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-3">
          <h4 className="text-sm font-medium text-gray-900 mb-2">
            You'll Need:
          </h4>
          <ul className="space-y-1">
            {recipe.missedIngredients.map((ing) => (
              <li
                key={ing.id}
                className="text-sm text-gray-600 flex items-start"
              >
                <span className="inline-block w-2 h-2 rounded-full bg-amber-500 mt-1.5 mr-2 flex-shrink-0" />
                <span>{ing.original}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto pt-4 grid grid-cols-2 gap-2">
          <button
            onClick={copyIngredients}
            className="flex items-center justify-center gap-1 px-3 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200"
          >
            <Copy className="h-4 w-4" />
            Copy List
          </button>
          <a
            href={`/recipe/${recipe.id}`}
            className="flex items-center justify-center gap-1 px-3 py-2 bg-amber-500 rounded-lg text-sm font-medium text-white hover:bg-amber-600"
          >
            <ExternalLink className="h-4 w-4" />
            View Recipe
          </a>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;