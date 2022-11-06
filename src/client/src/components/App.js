import React from "react";
import { Route, Routes } from 'react-router-dom';
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import Login from "./Login";
import Register from "./Register";
import SashayAway from "./SashayAway";
import Thanks from "./Thanks";
import Results from "./results/Results";

function App() {
    return <div>
        <Header key="header"/>
        <Routes>
            <Route index path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/thanks" element={<Thanks />} />
            <Route path="/results" element={<Results />} />
            <Route path="/sashay" element={<SashayAway />} />
        </Routes>
        <Footer />
    </div>;
}

export default App;