/** @format */

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/layouts/header";
import Footer from "./components/layouts/footer";
import Home from "./pages/home";
import Presale from "./pages/presale";

export default function Routing() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route exact path="/presale" element={<Home />} />
                <Route exact path="/" element={<Presale />} />
            </Routes>
            <Footer />
        </Router>
    );
}
