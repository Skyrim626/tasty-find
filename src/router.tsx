import { createBrowserRouter } from "react-router-dom";
import Home from "./modules/Home";

/**
 * Router configurations. This is where you add routes for this application.
 */
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  }
]);

export default router;