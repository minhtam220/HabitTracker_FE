import React from "react";
import { Route, Routes } from "react-router-dom";
import BlankLayout from "../layouts/BlankLayout";
import MainLayout from "../layouts/MainLayout";
import AnalysePage from "../pages/AnalysePage";
import BuildPage from "../pages/BuildPage";
import CheckPage from "../pages/CheckPage";
import LoginPage from "../pages/LoginPage";
import RecoverPage from "../pages/RecoverPage";
import RegisterPage from "../pages/RegisterPage";
import AuthRequire from "./AuthRequire";

function Router() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthRequire>
            <MainLayout />
          </AuthRequire>
        }
      >
        <Route index element={<AnalysePage />} />
        <Route path="/analyse" element={<AnalysePage />} />
        <Route path="/build" element={<BuildPage />} />
        <Route path="/check" element={<CheckPage />} />
      </Route>
      <Route element={<BlankLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/recover" element={<RecoverPage />} />
      </Route>
    </Routes>
  );
}

export default Router;
