
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./pages/About/About.jsx";
import CategoryDetail from "./pages/CategoryDetail.jsx";
import Index from "./pages/Index.jsx";
import NotFound from "./pages/NotFound.jsx";
import Layout from "./pages/Layout.jsx";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="about" element={<About />} />
        </Route>
        <Route path="/category/:categoryId" element={<CategoryDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;