import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import LandingPage from "./pages/Landing/LandingPage";
import Layout from "./components/layout/Layout";
import JobsPage from "./pages/Jobs/JobsPage";
import JobDetailsPage from "./pages/Jobs/JobDetailsPage";
import { useEffect } from "react";
import { useAuthStore } from "./stores/authStore";
import Auth from "./pages/Auth/Auth";

function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="jobs" element={<JobsPage />} />
          <Route path="jobs/:id" element={<JobDetailsPage />} />
          <Route path="/auth" element={<Auth />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
