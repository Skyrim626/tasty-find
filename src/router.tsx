import { createBrowserRouter } from "react-router-dom";
import Home from "./modules/Home";
import RecipeInformation from "./modules/RecipeInformation";

/**
 * Router configurations. This is where you add routes for this application.
 */
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path:"/recipe/:id",
    element: <RecipeInformation />
  }
]);

export default router;