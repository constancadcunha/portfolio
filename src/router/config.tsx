
import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import PricingPage from "../pages/pricing/page";
import FeaturesPage from "../pages/features/page";
import AboutPage from "../pages/about/page";
import ContactPage from "../pages/contact/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/pricing",
    element: <PricingPage />,
  },
  {
    path: "/features",
    element: <FeaturesPage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/contact",
    element: <ContactPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
