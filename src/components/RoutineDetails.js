import React, { useState, useEffect } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";

const RoutineDetails = () => {
    const {routineState} = useOutletContext();
    const [routines, setRoutines] = routineState
    const { id } = useParams();
    const thisRoutine = routines.find((routine) => {
        return id == routine.id
    });
    const {name, goal, creatorName, activities} = thisRoutine
    const currentToken = localStorage.getItem("token");


    return (
        <div>
            {currentToken && currentToken.length ? 
                <div id="routine-details-container">
                    <h2>{name}</h2>
                    <h4>Goal: {goal}</h4>
                    <p><b>Created by: </b>{creatorName}</p>
                    <b>Activities: </b>
                    {activities.map((activity, idx) => {
                        return <div key={idx} id="listof-routs-div">
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