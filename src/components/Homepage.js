import React, {useState, useEffect} from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Homepage = () => {
    const [activities, setActivities] = useState([]);
    const [routines, setRoutines] = useState([]);

    useEffect(() => {
        async function fetchActivities() {
            try {
                const response = await fetch ("http://fitnesstrac-kr.herokuapp.com/api/activities", {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                const data = await response.json();

                setActivities(data)
            } catch (error) {
                console.error
            }
        }

        fetchActivities();

    }, []);

    useEffect(() => {
        async function fetchRoutines() {
            try {
                const response = await fetch ("http://fitnesstrac-kr.herokuapp.com/api/routines", {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                const data = await response.json();

                setRoutines(data)
            } catch (error) {
                console.error
            }
        }

        fetchRoutines();

    }, []);

    return (
        <div>
            <div id="nav-container">
                <h1>Fitness Trackr</h1>
                <Navbar />
            </div>
            <Outlet context={[activities, routines]}/>
        </div>
    )
};

export default Homepage;