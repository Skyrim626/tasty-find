
const QuotaExceed = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-6 rounded-lg max-w-2xl mx-auto">
        <h2 className="text-xl font-bold mb-2">API Daily Limit Reached</h2>
        <p className="mb-3">
          We've reached our daily limit for recipe data. Please try again
          tomorrow.
        </p>
        {/* <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            // You could load sample/mock data here
            // setRecipeInformation(sampleRecipeData);
          }}
        >
          View Sample Recipe
        </button> */}
      </div>
    </div>
  );
};

export default QuotaExceed;
