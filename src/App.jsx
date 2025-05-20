import { Routes, Route } from "react-router-dom";
import Home from "./App/Home";

import BackgroundDetail from "./App/BackgroundDetail";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/backgrounds/:id" element={<BackgroundDetail />} />
      </Routes>
    </>
  );
}

export default App;
