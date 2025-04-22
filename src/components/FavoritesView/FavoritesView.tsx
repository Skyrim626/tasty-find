import { Heart } from "lucide-react";
import Recipe from "../../models/Recipe";
import RecipeCard from "../RecipeCard";

interface FavoritesViewProps {
  favorites: Recipe[];
  onFavoriteClick: (recipe: Recipe) => void;
}

const FavoritesView: React.FC<FavoritesViewProps> = ({
  favorites,
  onFavoriteClick,
}) => {
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Your Favorite Recipes
        </h2>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
          Quick access to recipes you love
        </p>
      </div>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-scols-3 gap-6">
          {favorites.map((recipe: Recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              isFavorite={true}
              onFavoriteClick={onFavoriteClick}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-amber-100 rounded-full p-4 mb-4">
            <Heart className="h-8 w-8 text-amber-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No favorites yet
          </h3>
          <p className="text-gray-600 max-w-md mx-auto">
            When you find recipes you love, click the heart icon to add them to
            your favorites!
          </p>
        </div>
      )}
    </div>
  );
};

export default FavoritesView;
