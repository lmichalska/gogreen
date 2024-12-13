import { Route, Routes } from "react-router-dom";
import BottomNav from "./Components/NavBar/BottomNav";
import NavBar from "./Components/NavBar/TopNav";
import HomePage from "./Pages/HomePage";
import Game from "./Pages/Game";
import ArticlesPage from "./Pages/Articles";
import ArticlePage from "./Pages/Article";
import "./App.css";

function App() {
  return (
    <>
      <div className="app-container">
        <NavBar/>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/game" element={<Game />} />
            <Route path="/read" element={<ArticlesPage />} />
            <Route path="/article/:articleId" element={<ArticlePage />} />
          </Routes>
          <BottomNav/>
        </div>
    </>
  );
}

export default App;
