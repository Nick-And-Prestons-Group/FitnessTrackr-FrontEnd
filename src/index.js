import React from "react";
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Homepage from "./components/Homepage";
import ErrorPage from "./components/ErrorPage";
import Activities from "./components/Activities";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Routines from "./components/Routines";
import RoutineDetails from "./components/RoutineDetails";

const appElement = document.getElementById("app");
const root = createRoot(appElement);

const router = createBrowserRouter([
    {
        path: "/",
        element: <Homepage/>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/activities",
                element: <Activities/>
            },
            {
                path: "/routines",
                element: <Routines/>
            },
            {
                path: "/routines/:id",
                element: <RoutineDetails/>
            },
            {
                path: "/login",
                element: <Login/>
            },
            {
                path: "/register",
                element: <Register/>
            },
            {
                path: "/profile",
                element: <Profile/>
            }
        ]
    }
]);

root.render(<RouterProvider router={router}/>);