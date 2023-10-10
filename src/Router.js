import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Steganography from "./pages/steganography";
import Home from "./pages/home";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
      <Routes>
        <Route
          path="/steganography"
          element={
            <Layout>
              <Steganography />{" "}
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default AppRouter;
