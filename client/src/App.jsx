import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Drives from "./pages/Drives.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import About from "./pages/About/About.jsx";
import CategoryDetail from "./pages/CategoryDetail.jsx";
// import DriveDetail from "./components/DriveDetail.jsx";
import Index from "./pages/Index.jsx";
import NotFound from "./pages/NotFound.jsx";
import Layout from "./pages/Layout.jsx";
import AuthPage from "./pages/AuthPage/AuthPage.jsx";


const App = () => {
  return (
    <Router>
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="about" element={<About />} />
          <Route path="auth" element={<AuthPage />} />
        </Route>
        <Route path="/category/:categoryId" element={<CategoryDetail />} />
        <Route path="/drives" element={<Drives />} />
        {/* <Route path="/drive/:driveId" element={<DriveDetail />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;