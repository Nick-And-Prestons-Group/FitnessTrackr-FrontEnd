import React, { useState, useEffect } from "react";
import { Link, useOutletContext, useParams, useNavigate } from "react-router-dom";

const EditRoutine = () => {
    const {routineState} = useOutletContext();
    const {idState} = useOutletContext();
    const [routines, setRoutines] = routineState;
    const [id, setId] = idState;
    const navigate = useNavigate();
    const currentToken = localStorage.getItem("token");
    const [editRoutName, setEditRoutName] = useState("");
    const [editRoutGoal, setEditRoutGoal] = useState("");
    const { routineId } = useParams();

    const thisRoutine = routines.find((routine) => {
        return routineId == routine.id
    });
    console.log("this rout: ", thisRoutine);

    const {name, goal, creatorId, activities} = thisRoutine

    async function editRoutine(event) {
        event.preventDefault();

        try {
            const response = await fetch(`http://fitnesstrac-kr.herokuapp.com/api/routines/${routineId}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${currentToken}`
                    },
                body: JSON.stringify({
                    name: editRoutName,
                    goal: editRoutGoal
                })
            })
            const data = await response.json();
            console.log("edit data: ", data)
            navigate("/routines");
        } catch (error) {
            console.error
        }
    };


    function updateNameState(event) {
        setEditRoutName(event.target.value)
    };

    function updateGoalState(event) {
        setEditRoutGoal(event.target.value)
    };

    async function deleteRoutine(event) {
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


    return (
        <div>
            {id && id === creatorId ? 
                <div>
                    <div id="edit-routine-div">
                    <form onSubmit={editRoutine}>
                        <p><b>Name: </b>{name}</p>
                        <input placeholder="Edit name" value={editRoutName} onChange={updateNameState} type="text"/>
                        <br/>
                        <p><b>Goal: </b>{goal}</p>
                        <input placeholder="Edit goal" value={editRoutGoal} onChange={updateGoalState} type="text"/>
                        <br/>
                        <button type="submit">Submit</button>
                    </form>
                    <br/>
                    </div>
                    <div id="delete-btn-container">
                    <form onSubmit={deleteRoutine}>
                        <button id="delete-btn" type="submit">Delete this routine</button>
                    </form>
                    </div>
                    {activities.map((activity, idx) => {
                        return <div key={idx} id="user-info-display">
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

export default EditRoutine;