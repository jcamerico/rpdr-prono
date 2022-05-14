import React from "react";
import { BrowserRouter } from 'react-router-dom';
import App from "./components/App";
import { createRoot } from 'react-dom/client';

const container = document.getElementById('app');
const root = createRoot(container);
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);