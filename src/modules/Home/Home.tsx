import { useState } from "react";
import { Search, Heart, ChefHat, ListFilter } from "lucide-react";
import Recipe from "../../models/Recipe";
import FavoritesView from "../../components/FavoritesView";
import TabButton from "../../components/TabButton";
import useRecipe from "../../hooks/useRecipe";
import Hero from "./components/Hero";
import HeaderContainer from "./components/HeaderContainer";
import RecipeList from "../../components/RecipeList";
import Footer from "./components/Footer";
import Filters from "../../components/Filters";
import { Link } from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import FilterOptions from "../../types/FilterOption";

// Home Page Component
const Home: React.FC = () => {
  const [favorites, setFavorites] = useState<Recipe[]>(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });
  const [activeTab, setActiveTab] = useState<"search" | "favorites">("search");
  const [searchInputFocused, setSearchInputFocused] = useState<boolean>(false);
  const [filtersOpen, setFiltersOpen] = useState<boolean>(true);

  // Filter Options
  const [filters, setFilters] = useState<FilterOptions>({
    ranking: 1,
    maxNumber: 5,
    ignorePantry: true,
  });

  // Use Recipe
  const { loading, recipes, searchRecipes } = useRecipe();

  const toggleFavorite = (recipe: Recipe): void => {
    const newFavorites = favorites.find((fav) => fav.id === recipe.id)
      ? favorites.filter((fav) => fav.id !== recipe.id)
      : [...favorites, recipe];
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  // Handle Search
  const handleSearchRecipe = (ingredients: string[]) => {
    searchRecipes(ingredients, filters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <HeaderContainer>
        <Link to={"/"} className="flex items-center">
          <ChefHat className="h-8 w-8 text-amber-500" />
          <h1 className="ml-2 text-2xl font-bold text-gray-800">TastyFind</h1>
        </Link>
        <nav className="flex space-x-4">
          <TabButton
            active={activeTab === "search"}
            onClick={() => setActiveTab("search")}
            icon={<Search className="h-4 w-4" />}
            label="Find Recipes"
          />
          <TabButton
            active={activeTab === "favorites"}
            onClick={() => setActiveTab("favorites")}
            icon={<Heart className="h-4 w-4" />}
            label="Favorites"
          />
        </nav>
      </HeaderContainer>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "search" ? (
          <>
            {/* Hero Section */}
            <Hero />

            {/* Search Section */}
            <SearchBar
              onSearch={handleSearchRecipe}
              onFocusChange={setSearchInputFocused}
            />

            {/* Filters */}
            <div className="mt-6">
              <button
                onClick={() => setFiltersOpen(!filtersOpen)}
                className="flex items-center text-gray-600 hover:text-gray-900 font-medium"
              >
                <ListFilter className="mr-2 h-5 w-5" />
                {filtersOpen ? "Hide Filters" : "Show Filters"}
              </button>

              {filtersOpen && (
                <Filters
                  filters={filters}
                  onFilterChange={(newFilters) => setFilters(newFilters)}
                />
              )}
            </div>

            {/* Results */}
            <RecipeList
              loading={loading}
              recipes={recipes}
              favorites={favorites}
              searchInputFocused={searchInputFocused}
              toggleFavorite={toggleFavorite}
            />
          </>
        ) : (
          // Favorites Tab
          <FavoritesView
            favorites={favorites}
            onFavoriteClick={toggleFavorite}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
