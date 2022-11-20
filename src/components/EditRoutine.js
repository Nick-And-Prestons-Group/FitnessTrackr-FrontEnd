import React, { useState, useEffect } from "react";
import { Link, useOutletContext, useParams, useNavigate } from "react-router-dom";

const EditRoutine = () => {
    const {routineState} = useOutletContext();
    const {idState} = useOutletContext();
    const [routines, setRoutines] = routineState;
    const [id, setId] = idState;
    const navigate = useNavigate();
    const currentToken = localStorage.getItem("token");
    const [newRoutName, setNewRoutName] = useState("");
    const [newRoutGoal, setNewRoutGoal] = useState("");
    // const [routineId, setRoutineId] = useState("");
    const { routineId } = useParams();

    const thisRoutine = routines.find((routine) => {
        return id == routine.id
    });
    const {name, goal, creatorName, activities} = thisRoutine

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

    console.log("ctid: ", id)
    console.log("ROUTINE ID: ", routineId)

    return (
        <div>
            {currentToken && currentToken.length ? 
                <div>
                    <p>edit routine</p>
                </div>
            : <div>
                <p>Please log in or register for an account to view routines</p>
                <Link to="/login">Click Here</Link>
            </div> }
        </div>
    )
};

export default EditRoutine;

            {/* ???
            {mappedRoutineNames.map(() => {
                <div key={idx}>
                     <p>{mappedRoutineNames}</p> 
                    <form onSubmit={(e) => deleteRoutine(e, eachRoutine.id)}>
                        <p>{mappedRoutineNames}</p> 
                        <Link to={`/routines/${eachRoutine.id}`}>Edit or delete this routine</Link>
                        <p>{eachRoutine.goal}</p>
                        <button value={routineId} type="submit">Delete this routine</button>
                    </form>
                </div>
            })} */}