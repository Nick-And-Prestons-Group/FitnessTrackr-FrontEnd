import React, { useState, useEffect } from "react";
import { useOutletContext, useParams, useNavigate } from "react-router-dom";

const MyRoutines = () => {
    // different component for edit/delete? different page?
    const {routineState} = useOutletContext();
    const {idState} = useOutletContext();
    const [routines, setRoutines] = routineState;
    const [id, setId] = idState;
    const navigate = useNavigate();
    const currentToken = localStorage.getItem("token");
    const [newRoutName, setNewRoutName] = useState("");
    const [newRoutGoal, setNewRoutGoal] = useState("");
    const [routineId, setRoutineId] = useState("");

    const yourRoutines = routines.filter((routine) => {
        return id == routine.creatorId
    });

    console.log("your routes: ", yourRoutines)

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

    async function editRoutine(event) {
        
    }

    async function deleteRoutine(event, routineId) {
        event.preventDefault();

        try {
            const response = await fetch(`http://fitnesstrac-kr.herokuapp.com/api/routines/${routineId}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${currentToken}`
                    }
            })
            const data = await response.json();
            console.log("delete data: ", data)
            navigate("/routines");
        } catch (error) {
            console.error
        }
    };

    function updateRoutineIdState(event) {
        setRoutineId(event.target.value)
    }


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
            <h1>Your Routines</h1>
            {/* ??? */}
            {yourRoutines.map((eachRoutine, idx) => {
                <div key={idx}>
                    <form onSubmit={(e) => deleteRoutine(e, eachRoutine.id)}>
                        <p>{eachRoutine.name}</p> 
                        <p>{eachRoutine.goal}</p>
                        <button value={routineId} type="submit">Delete this routine</button>
                    </form>
                </div>
            })}
        </div>
    )
};

export default MyRoutines;