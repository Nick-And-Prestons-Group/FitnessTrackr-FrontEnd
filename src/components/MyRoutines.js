import React, { useState, useEffect } from "react";
import { Link, useOutletContext, useParams, useNavigate } from "react-router-dom";

const MyRoutines = () => {
    const {routineState} = useOutletContext();
    const {idState} = useOutletContext();
    const [routines, setRoutines] = routineState;
    const [id, setId] = idState;

    const navigate = useNavigate();
    const currentToken = localStorage.getItem("token");

    const [newRoutName, setNewRoutName] = useState("");
    const [newRoutGoal, setNewRoutGoal] = useState("");
    const [addedRoutName, setAddedRoutName] = useState("");
    const [addedRoutGoal, setAddedRoutGoal] = useState("");

    const yourRoutines = routines.filter((routine) => {
        return id == routine.creatorId
    });

    async function addNewRoutine(event) {
        event.preventDefault();

        try {
            const response = await fetch("http://fitnesstrac-kr.herokuapp.com/api/routines", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${currentToken}`
                    },
                body: JSON.stringify({
                    name: newRoutName,
                    goal: newRoutGoal,
                    isPublic: true
                })
            })
            const data = await response.json();
            setAddedRoutName(data.name);
            setAddedRoutGoal(data.goal);
            setNewRoutName("");
            setNewRoutGoal("");
        } catch (error) {
            console.error
        }
    };

    function updateNameState(event) {
        setNewRoutName(event.target.value)
    };

    function updateGoalState(event) {
        setNewRoutGoal(event.target.value)
    };


    return (
        <div>
            <form onSubmit={addNewRoutine}>
                <h2>Create a New Routine</h2>
                <input required placeholder="Name of routine" value={newRoutName} onChange={updateNameState} type="text"/>
                <br />
                <input required placeholder="Your goal" value={newRoutGoal} onChange={updateGoalState} type="text"/>
                <br />
                <button type="submit">Submit</button>
                <br />
            </form>

            {addedRoutName && addedRoutName.length ? 
                    <div>Your new routine!
                        <p>{addedRoutName}</p>
                        <p>{addedRoutGoal}</p>
                    </div>
                : null}
                
            <h1>Your Routines</h1>
            {yourRoutines.map((eachRoutine, idx) => { 
                return <div key={idx}>
                    <h4>{eachRoutine.name}</h4>
                    <Link to={`/editroutine/${eachRoutine.id}`}>Edit or delete this routine</Link>
                </div>
            })}
        </div>
    )
};

export default MyRoutines;