import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import LandingPage from "./pages/Landing/LandingPage";
import Layout from "./components/layout/Layout";
import JobsPage from "./pages/Jobs/JobsPage";
import JobDetailsPage from "./pages/Jobs/JobDetailsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="jobs" element={<JobsPage />} />
          <Route path="jobs/:id" element={<JobDetailsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
