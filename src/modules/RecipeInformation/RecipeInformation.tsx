import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import useRecipeInformation from "../../hooks/useRecipeInformation";
import { useEffect } from "react";
import QuotaExceed from "../../components/QuotaExceed";
import { convertUsdToPhp } from "../../utils/conversion";

const RecipeInformation = () => {
  // Use params
  const { id } = useParams();

  // Use Navigate
  const navigate = useNavigate();

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
  }, [id, getRecipeInformation]);

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

  if (isQuotaExceeded) {
    return <QuotaExceed />;
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

  return (
    <>
      <Helmet>
        <title>{recipeMeta.title} - TastyFind</title>
        <meta name="description" content={recipeMeta.description} />
      </Helmet>

      <div className="container mx-auto px-4 py-8">

        {/* Go Back Button */}
        <button
          onClick={() => navigate(-1)} // Go back to the previous page
          className="mb-4 p-2 bg-yellow-200 hover:bg-yellow-300 text-yellow-600 rounded-lg"
        >
          &larr; Go Back
        </button>

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
                Price: {convertUsdToPhp(recipeInformation.pricePerServing)} {" "}
                per serving
              </span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {recipeInformation.diets &&
              recipeInformation.diets.map((diet, index: number) => (
                <span
                  key={`diet-${index}`}
                  className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded"
                >
                  {diet}
                </span>
              ))}
            {recipeInformation.dishTypes &&
              recipeInformation.dishTypes.map((dishType, index) => (
                <span
                  key={`dish-${index}`}
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
            <div className="lg:sticky lg:top-8">
              <img
                src={recipeInformation.image}
                alt={recipeInformation.title}
                className="w-full h-auto rounded-lg shadow-md mb-4"
              />

              {/* Source Info */}
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-4">
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

              {/* Quick Stats */}
              <div className="bg-yellow-50 p-4 rounded-lg shadow-sm">
                <h3 className="font-medium text-gray-800 mb-2">Quick Stats</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Preparation:</span>
                    <span className="font-medium">
                      {formatTime(recipeInformation.preparationMinutes)}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Cooking:</span>
                    <span className="font-medium">
                      {formatTime(recipeInformation.cookingMinutes)}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Servings:</span>
                    <span className="font-medium">{recipeInformation.servings}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Health Score:</span>
                    <span className="font-medium">{recipeInformation.healthScore}/100</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">WW Points:</span>
                    <span className="font-medium">{recipeInformation.weightWatcherSmartPoints}</span>
                  </li>
                </ul>
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
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {recipeInformation.extendedIngredients.map(
                  (ingredient, index) => (
                    <li key={`ingredient-${index}`} className="flex items-start p-2 rounded hover:bg-gray-50">
                      <div className="h-6 w-6 flex-shrink-0 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-yellow-600 text-xs font-bold">{index + 1}</span>
                      </div>
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
                <ol className="space-y-4">
                  {recipeInformation.analyzedInstructions[0].steps.map(
                    (step, index) => (
                      <li key={`step-${index}`} className="pb-4 border-b border-gray-100 last:border-0">
                        <div className="flex">
                          <div className="h-8 w-8 flex-shrink-0 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                            <span className="text-blue-600 font-bold">{step.number}</span>
                          </div>
                          <div>
                            <p className="text-gray-700">{step.step}</p>
                            
                            {/* Equipment and ingredients used in this step */}
                            {(step.equipment?.length > 0 || step.ingredients?.length > 0) && (
                              <div className="mt-2 flex flex-wrap gap-2">
                                {step.equipment?.map((item, idx) => (
                                  <span key={`equip-${idx}`} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                                    {item.name}
                                  </span>
                                ))}
                                {step.ingredients?.map((item, idx) => (
                                  <span key={`ing-${idx}`} className="bg-yellow-50 text-yellow-700 text-xs px-2 py-1 rounded">
                                    {item.name}
                                  </span>
                                ))}
                              </div>
                            )}
                            
                            {/* Time information if available */}
                            {step.length && (
                              <p className="text-sm text-gray-500 mt-1">
                                ⏱️ {step.length.number} {step.length.unit}
                              </p>
                            )}
                          </div>
                        </div>
                      </li>
                    )
                  )}
                </ol>
              ) : recipeInformation.instructions ? (
                <div
                  className="prose prose-sm max-w-none text-gray-700"
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
                <div className="mb-8 bg-amber-50 p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                    <svg className="w-6 h-6 mr-2 text-amber-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd"></path>
                    </svg>
                    Wine Pairing
                  </h2>
                  <p className="mb-3 text-gray-700">
                    {recipeInformation.winePairing.pairingText}
                  </p>

                  <h3 className="font-medium text-gray-800 mt-4 mb-2">
                    Recommended Wine Types:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {recipeInformation.winePairing.pairedWines.map(
                      (wine, index) => (
                        <span key={`wine-${index}`} className="capitalize bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm">
                          {wine}
                        </span>
                      )
                    )}
                  </div>

                  {recipeInformation.winePairing.productMatches &&
                    recipeInformation.winePairing.productMatches.length > 0 && (
                      <div className="mt-5 pt-4 border-t border-amber-200">
                        <h3 className="font-medium text-gray-800 mb-3">
                          Suggested Product:
                        </h3>
                        <div className="flex bg-white p-3 rounded-lg shadow-sm">
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
                              className="w-20 h-auto object-contain mr-4"
                            />
                          )}
                          <div>
                            <p className="font-medium text-gray-800">
                              {
                                recipeInformation.winePairing.productMatches[0]
                                  .title
                              }
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              {
                                recipeInformation.winePairing.productMatches[0]
                                  .description
                              }
                            </p>
                            <div className="flex items-center mt-2">
                              <span className="font-medium text-green-600">
                                {
                                  recipeInformation.winePairing
                                    .productMatches[0].price
                                }
                              </span>
                              {recipeInformation.winePairing.productMatches[0]
                                .averageRating && (
                                <div className="ml-3 flex items-center">
                                  <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                      <svg 
                                        key={`star-${i}`}
                                        className={`w-4 h-4 ${
                                          i < Math.round(recipeInformation.winePairing.productMatches[0].averageRating * 5) 
                                            ? 'text-yellow-400' 
                                            : 'text-gray-300'
                                        }`} 
                                        fill="currentColor" 
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                      </svg>
                                    ))}
                                  </div>
                                  <span className="text-xs text-gray-500 ml-1">
                                    ({(recipeInformation.winePairing.productMatches[0].averageRating * 5).toFixed(1)})
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                </div>
              )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeInformation;