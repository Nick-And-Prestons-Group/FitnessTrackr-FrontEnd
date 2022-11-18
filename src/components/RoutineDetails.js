import React, { useState, useEffect } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";

const RoutineDetails = () => {
    const [, routines] = useOutletContext();
    const { id } = useParams();
    const [routineName, setRoutineName] = useState("");
    const [routineGoal, setRoutineGoal] = useState("")
    const [routineCreator, setRoutineCreator] = useState("")
    const [eachActivity, setEachActivity] = useState([]);
    const currentToken = localStorage.getItem("token");

    useEffect(() => {
        const filteredRoutines = routines.filter(eachRoutine => 
            eachRoutine.id == id);
            console.log("filtered routines name: ", filteredRoutines.name)
            setRoutineName(filteredRoutines.name);
            setRoutineGoal(filteredRoutines.goal);
            setRoutineCreator(filteredRoutines.creatorName);
            console.log("name: ", routineName);
            console.log("goal: ", routineGoal);
            console.log("creator: ", routineCreator);


        const mappedActivities = filteredRoutines.map((routineData) => {
            return routineData.activities});

            setEachActivity(mappedActivities);

            console.log("act: ", eachActivity);
    }, [])

    return (
        <div>
            {currentToken && currentToken.length ? 
                <div>
                    <h2>{routineName}</h2>
                    <h4>Goal: {routineGoal}</h4>
                    <p><b>Created by: </b>{routineCreator}</p>
                    <b>Activities: </b>
                    {eachActivity.map((activity, idx) => {
                        return <div key={idx}>
                            <b>{activity.name}</b>
                            <p>Description: {activity.description}</p>
                            <p>Do {activity.count} reps for {activity.duration} minutes</p>
                        </div>
                    })}
                </div>
            : <div>
                <p>Please log in or register for an account to view routines</p>
                <Link to="/login">Click Here</Link>
            </div> }
        </div>
    )
};

export default RoutineDetails;      