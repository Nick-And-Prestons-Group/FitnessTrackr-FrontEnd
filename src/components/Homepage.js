import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Homepage = () => {
    // initial api calls here, data passed to outlet context

    return (
        <div>
            <div id="nav-container">
                <h1>Fitness Trackr</h1>
                <Navbar />
            </div>
            {/* <Outlet context={} /> */}
        </div>
    )
};

export default Homepage;