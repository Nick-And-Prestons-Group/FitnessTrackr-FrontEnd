import React from "react";
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const appElement = document.getElementById("app");
const root = createRoot(appElement);

const App = () => {
    return (
        <div>
            <p>Hello World</p>
        </div>
    )
};

root.render(<App/>);