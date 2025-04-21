
import  { useState } from 'react';
import { motion } from 'framer-motion';
import spoonacularApi from '../../api/axios';
import SearchBar from '../../components/SearchBar';
import RecipeCard from '../../components/RecipeCard';
import Filters from '../../components/Filters';
import Recipe from '../../components/models/Recipe';
// import Filters from './components/Filters';

const Home = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const searchRecipes = async (ingredients: any, filters = {}) => {
    setLoading(true);
    try {

      const response = await spoonacularApi.get('/recipes/findByIngredients', {
        params: {
          ingredients: ingredients.join(','),
          number: 12,
          ranking: 2,
          ignorePantry: true
        }
      });

      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
    setLoading(false);
  };

  const toggleFavorite = (recipe: any) => {
    const newFavorites = favorites.find((fav: any) => fav.id === recipe.id)
      ? favorites.filter((fav: any) => fav.id !== recipe.id)
      : [...favorites, recipe];
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">
          TastyFind
        </h1>
        <SearchBar onSearch={searchRecipes} />
        <Filters onFilterChange={searchRecipes} />
        
        {loading ? (
          <div className="flex justify-center mt-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {recipes.map((recipe: any) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                isFavorite={favorites.some((fav: any) => fav.id === recipe.id)}
                onFavoriteClick={() => toggleFavorite(recipe)}
              />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Home;
