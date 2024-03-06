import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import Routes
import Home from "./pages/Home";
import DishDetailsPage from "./pages/DishDetailsPage";
import DishSuggester from "./pages/DishSuggester";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dish/:dishName" element={<DishDetailsPage />} />
        <Route path="/suggester" element={<DishSuggester />} />
      </Routes>
    </Router>
  );
};

export default App;
