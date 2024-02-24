import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home.jsx";
import Profile from "./pages/profile/Profile.jsx";

import Page from "./components/page/Page.jsx";
import AnimeIndex from "./pages/anime/anime-index/AnimeIndex.jsx";
import AnimeSearch from "./pages/anime/anime-search/AnimeSearch.jsx";
import AnimeInfo from "./pages/anime/anime-info/AnimeInfo.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page />}>
          <Route index element={<Home />} />
          <Route path="anime">
            <Route index element={<AnimeIndex />} />
            <Route path="top" element={<p>top anime</p>} />
            <Route path="search" element={<AnimeSearch />} />
            <Route path=":id" element={<AnimeInfo />} />
          </Route>
          <Route path="manga">
            <Route index element={<p>manga</p>} />
            <Route path="top" element={<p>top manga</p>} />
            <Route path="search" element={<p>search manga</p>} />
            <Route path=":id" element={<p>certain manga</p>} />
          </Route>
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
