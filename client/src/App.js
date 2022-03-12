import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Defense from "./pages/Defense";
import Offense from "./pages/Offense";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Defense />} />
        <Route path="/offense" element={<Offense />} />
        {/* <Route path="/*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
