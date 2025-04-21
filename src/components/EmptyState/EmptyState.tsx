import { ChefHat } from "lucide-react"

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="bg-amber-100 rounded-full p-4 mb-4">
        <ChefHat className="h-8 w-8 text-amber-500" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to cook?</h3>
      <p className="text-gray-600 max-w-md mx-auto">
        Add ingredients you have in your kitchen, and we'll show you delicious
        recipes you can make!
      </p>
    </div>
  )
}

export default EmptyState
