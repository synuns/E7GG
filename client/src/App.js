import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import ErrorBoundary from './components/ErrorBoundary';
import NavBar from "./components/NavBar";
import Defense from "./pages/Defense";
import Offense from "./pages/Offense";
import NotFound from "./pages/NotFound";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <BrowserRouter>
        <NavBar />
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Defense />} />
            <Route path="/offense" element={<Offense />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
