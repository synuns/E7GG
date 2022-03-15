import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from "./context/ThemeProvider";
import ErrorBoundary from './components/ErrorBoundary';
import NavBar from "./components/NavBar";
import Defense from "./routes/Defense";
import Offense from "./routes/Offense";
import NotFound from "./routes/NotFound";
import "./App.css";

function App() {
  return (
    <BrowserRouter basename="">
      <ThemeProvider>
        <CssBaseline />
        <NavBar />
        <ErrorBoundary>
          <Routes>
            <Route path="/e7gg/" element={<Defense />} />
            <Route path="/e7gg/defense" element={<Defense />} />
            <Route path="/e7gg/offense" element={<Offense />} />
            <Route path="/e7gg/*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
