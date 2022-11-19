import React, {useState, useEffect} from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Homepage = () => {
    const [activities, setActivities] = useState([]);
    const [routines, setRoutines] = useState([]);
    const [username, setUsername] = useState("");
    const [routineActivities, setRoutineActivities] = useState([]);
    const [id, setId] = useState("");
    const currentToken = localStorage.getItem("token");
    const pageContext = {activitiesState: [activities, setActivities], 
                        routineState: [routines, setRoutines],
                        usernameState: [username, setUsername], 
                        idState: [id, setId]}

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
                setRoutineActivities(data.activities)

                console.log(routineActivities)
            } catch (error) {
                console.error
            }
        }

        fetchRoutines();

    }, []);

    useEffect(() => {
        async function loadProfileInfo() {
            try {
                const response = await fetch ("http://fitnesstrac-kr.herokuapp.com/api/users/me", {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                })

                const data = await response.json();
                setUsername(data.username);
                setId(data.id);
            } catch (error) {
                console.error
            }
        }

        loadProfileInfo();

    }, [currentToken]);

    return (
        <div>
            <div id="nav-container">
                <h1>Fitness Trackr</h1>
                <Navbar />
            </div>
            <Outlet context={pageContext}/>
        </div>
    )
};

export default Homepage;