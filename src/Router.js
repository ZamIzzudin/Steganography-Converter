import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Steganography from "./pages/steganography";
import Home from "./pages/home";

function AppRouter(){
    return(
        <Router>
            <Routes>
                <Route exact path="/" element={<Home />} />
            </Routes>
            <Layout>
                <Routes>
                    <Route path="/steganography" element={<Steganography />} />
                </Routes>
            </Layout>
        </Router>
    )
}

export default AppRouter;