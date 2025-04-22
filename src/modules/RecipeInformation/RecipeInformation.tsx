import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import useRecipeInformation from "../../hooks/useRecipeInformation";
import { useEffect } from "react";
import QuotaExceed from "../../components/QuotaExceed";

const RecipeInformation = () => {
  // Use params
  const { id } = useParams();

  const filterOption = {
    includeNutrition: false,
    addWinePairing: true,
    addTasteData: false,
  };

  // Use Recipe Information
  const { loading, error, isQuotaExceeded, recipeInformation, getRecipeInformation } =
    useRecipeInformation();

  // Fetch information by id
  useEffect(() => {
    if (id) {
      getRecipeInformation(id, filterOption);
    }
  }, []);

  // SEO (Search Engine Optimization)
  const recipeMeta = {
    title: recipeInformation ? recipeInformation.title : `Recipe ${id}`,
    description: recipeInformation
      ? recipeInformation.summary.replace(/<[^>]*>/g, "").substring(0, 160)
      : `Loading recipe information...`,
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>Error loading recipe: {error}</p>
        </div>
      </div>
    );
  }

  if (!recipeInformation) {
    return null;
  }

  // Format time display
  const formatTime = (minutes: number | null) => {
    if (!minutes) return "Not specified";

    if (minutes < 60) {
      return `${minutes} min`;
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours} hr${hours > 1 ? "s" : ""} ${
        remainingMinutes > 0 ? `${remainingMinutes} min` : ""
      }`;
    }
  };

  if(isQuotaExceeded) {
    return <QuotaExceed />
  }

  return (
    <>
      <Helmet>
        <title>{recipeMeta.title} - TastyFind</title>
        <meta name="description" content={recipeMeta.description} />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Recipe Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {recipeInformation.title}
          </h1>
          <div className="flex flex-wrap items-center text-gray-600 gap-6 mb-4">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>
                Ready in: {formatTime(recipeInformation.readyInMinutes)}
              </span>
            </div>
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
              <span>Servings: {recipeInformation.servings}</span>
            </div>
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
              <span>Health Score: {recipeInformation.healthScore}</span>
            </div>
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>
                Price: ${(recipeInformation.pricePerServing / 100).toFixed(2)}{" "}
                per serving
              </span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {recipeInformation.diets &&
              recipeInformation.diets.map((diet, index) => (
                <span
                  key={index}
                  className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded"
                >
                  {diet}
                </span>
              ))}
            {recipeInformation.dishTypes &&
              recipeInformation.dishTypes.map((dishType, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
                >
                  {dishType}
                </span>
              ))}
            {recipeInformation.glutenFree && (
              <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
                Gluten Free
              </span>
            )}
            {recipeInformation.dairyFree && (
              <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
                Dairy Free
              </span>
            )}
            {recipeInformation.vegetarian && (
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                Vegetarian
              </span>
            )}
            {recipeInformation.vegan && (
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                Vegan
              </span>
            )}
          </div>
        </div>

        {/* Recipe Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Image */}
          <div className="md:col-span-1">
            <div className="sticky top-8">
              <img
                src={recipeInformation.image}
                alt={recipeInformation.title}
                className="w-full h-auto rounded-lg shadow-md mb-4"
              />

              {/* Source Info */}
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h3 className="font-medium text-gray-800 mb-2">Source</h3>
                <p className="text-sm text-gray-600">
                  Recipe by {recipeInformation.sourceName || "Unknown"}
                  {recipeInformation.sourceUrl && (
                    <a
                      href={recipeInformation.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 ml-1"
                    >
                      (View Original)
                    </a>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Recipe Details */}
          <div className="md:col-span-2">
            {/* Summary */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                About This Recipe
              </h2>
              <div
                className="prose prose-sm max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: recipeInformation.summary }}
              />
            </div>

            {/* Ingredients */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                Ingredients
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {recipeInformation.extendedIngredients.map(
                  (ingredient, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-yellow-500 mt-2 mr-2"></span>
                      <span>
                        <strong>
                          {ingredient.measures.us.amount}{" "}
                          {ingredient.measures.us.unitShort}
                        </strong>{" "}
                        {ingredient.name}
                        {ingredient.meta && ingredient.meta.length > 0 && (
                          <span className="text-gray-500 text-sm">
                            {" "}
                            ({ingredient.meta.join(", ")})
                          </span>
                        )}
                      </span>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Instructions */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                Instructions
              </h2>
              {recipeInformation.analyzedInstructions &&
              recipeInformation.analyzedInstructions.length > 0 ? (
                <ol className="list-decimal list-inside space-y-3 text-gray-700">
                  {/* {recipeInformation.analyzedInstructions[0].steps.map(
                    (step, index) => (
                      <li key={index} className="pl-2">
                        <span>{step.step}</span>
                      </li>
                    )
                  )} */}
                </ol>
              ) : recipeInformation.instructions ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: recipeInformation.instructions,
                  }}
                />
              ) : (
                <p className="text-gray-500 italic">
                  No detailed instructions available. Please check the original
                  recipe source for instructions.
                </p>
              )}
            </div>

            {/* Wine Pairing */}
            {recipeInformation.winePairing &&
              recipeInformation.winePairing.pairedWines &&
              recipeInformation.winePairing.pairedWines.length > 0 && (
                <div className="mb-8 bg-amber-50 p-4 rounded-lg">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">
                    Wine Pairing
                  </h2>
                  <p className="mb-2 text-gray-700">
                    {recipeInformation.winePairing.pairingText}
                  </p>

                  <h3 className="font-medium text-gray-800 mt-3 mb-1">
                    Recommended Wines:
                  </h3>
                  <ul className="list-disc list-inside text-gray-700">
                    {recipeInformation.winePairing.pairedWines.map(
                      (wine, index) => (
                        <li key={index} className="capitalize">
                          {wine}
                        </li>
                      )
                    )}
                  </ul>

                  {recipeInformation.winePairing.productMatches &&
                    recipeInformation.winePairing.productMatches.length > 0 && (
                      <div className="mt-4">
                        <h3 className="font-medium text-gray-800 mb-2">
                          Product Suggestion:
                        </h3>
                        <div className="flex">
                          {recipeInformation.winePairing.productMatches[0]
                            .imageUrl && (
                            <img
                              src={
                                recipeInformation.winePairing.productMatches[0]
                                  .imageUrl
                              }
                              alt={
                                recipeInformation.winePairing.productMatches[0]
                                  .title
                              }
                              className="w-20 h-auto mr-3"
                            />
                          )}
                          <div>
                            <p className="font-medium">
                              {
                                recipeInformation.winePairing.productMatches[0]
                                  .title
                              }
                            </p>
                            <p className="text-sm text-gray-600">
                              {
                                recipeInformation.winePairing.productMatches[0]
                                  .description
                              }
                            </p>
                            <p className="text-sm mt-1">
                              <span className="font-medium">
                                {
                                  recipeInformation.winePairing
                                    .productMatches[0].price
                                }
                              </span>
                              {recipeInformation.winePairing.productMatches[0]
                                .averageRating && (
                                <span className="ml-2">
                                  Rating:{" "}
                                  {(
                                    recipeInformation.winePairing
                                      .productMatches[0].averageRating * 5
                                  ).toFixed(1)}
                                  /5
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                </div>
              )}

            {/* Related Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Cooking Time */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-2">
                  Cooking Information
                </h3>
                <ul className="space-y-1 text-sm">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Preparation Time:</span>
                    <span>
                      {formatTime(recipeInformation.preparationMinutes)}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Cooking Time:</span>
                    <span>{formatTime(recipeInformation.cookingMinutes)}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Total Time:</span>
                    <span>{formatTime(recipeInformation.readyInMinutes)}</span>
                  </li>
                </ul>
              </div>

              {/* Additional Details */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-2">
                  Additional Details
                </h3>
                <ul className="space-y-1 text-sm">
                  <li className="flex justify-between">
                    <span className="text-gray-600">
                      Weight Watcher Points:
                    </span>
                    <span>{recipeInformation.weightWatcherSmartPoints}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Health Score:</span>
                    <span>{recipeInformation.healthScore} / 100</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Spoonacular Score:</span>
                    <span>{recipeInformation.spoonacularScore} / 100</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeInformation;
