import type { RouteObject } from "react-router-dom";
import { lazy, Suspense } from "react";
import Home from "../pages/home/page";

const NotFound = lazy(() => import("../pages/NotFound"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "*",
    element: (
      <Suspense fallback={null}>
        <NotFound />
      </Suspense>
    ),
  },
];

export default routes;
