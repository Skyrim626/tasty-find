import Recipe from "../../models/Recipe";
import EmptyState from "../EmptyState";
import LoadingState from "../LoadingState/LoadingState";
import RecipeCard from "../RecipeCard";

interface RecipeListProps {
  loading: boolean;
  recipes: Recipe[];
  favorites: Recipe[];
  searchInputFocused: boolean;
  toggleFavorite: (recipe: Recipe) => void;
}

const RecipeList: React.FC<RecipeListProps> = ({
  loading,
  recipes,
  favorites,
  searchInputFocused,
  toggleFavorite,
}) => {
  return (
    <div className="mt-8">
      {loading ? (
        <LoadingState />
      ) : recipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              isFavorite={favorites.some((fav) => fav.id === recipe.id)}
              onFavoriteClick={() => toggleFavorite(recipe)}
            />
          ))}
        </div>
      ) : (
        !searchInputFocused && <EmptyState />
      )}
    </div>
  );
};

export default RecipeList;
