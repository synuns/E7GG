import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import Defense from "./Defense";
import Offense from "./Offense";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Defense />} />
        <Route path="/offense" element={<Offense />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
