import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/home/Home.jsx";
import Profile from "./pages/profile/Profile.jsx";

import Page from "./components/page/Page.jsx";
import AnimeIndex from "./pages/anime/anime-index/AnimeIndex.jsx";
import AnimeSearch from "./pages/anime/anime-search/AnimeSearch.jsx";
import AnimeInfo from "./pages/anime/anime-info/AnimeInfo.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Page />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "anime",
        children: [
          {
            index: true,
            element: <AnimeIndex />,
          },
          {
            path: "top",
            element: <p>top anime</p>,
          },
          {
            path: "search",
            element: <AnimeSearch />,
          },
          {
            path: ":id",
            element: <AnimeInfo />,
          },
        ],
      },
      {
        path: "manga",
        children: [
          {
            index: true,
            element: <p>manga</p>,
          },
          {
            path: "top",
            element: <p>top manga</p>,
          },
          {
            path: "search",
            element: <p>search manga</p>,
          },
          {
            path: ":id",
            element: <p>certain manga</p>,
          },
        ],
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
