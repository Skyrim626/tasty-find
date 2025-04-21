import { ChefHat } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="border-t border-gray-200 pt-6 flex flex-col items-center">
          <div className="flex items-center">
            <ChefHat className="h-6 w-6 text-amber-500" />
            <p className="ml-2 text-gray-700 font-medium">TastyFind</p>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Find the perfect recipe for ingredients you already have
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
