import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewActivity = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const currentToken = localStorage.getItem("token");
    const navigate = useNavigate();

    async function addNewActivity(event) {
        event.preventDefault();

        try {
            const response = await fetch("http://fitnesstrac-kr.herokuapp.com/api/activities", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${currentToken}`
                  },
                body: JSON.stringify({
                    name: name,
                    description: description
                })
            })
            const data = await response.json();
        } catch (error) {
            console.error
        }
    };

    function updateNameState(event) {
        setName(event.target.value)
    };

    function updateDescriptionState(event) {
        setDescription(event.target.value)
    };

    return (
        <div> 
            <form onSubmit={addNewActivity}>
                <h2>Add a new activity</h2>
                <br />
                <input required placeholder="Name of activity" value={name} onChange={updateNameState} type="text"/>
                <br />
                <input required placeholder="Description" value={description} onChange={updateDescriptionState} type="text"/>
                <br />
                <button type="submit">Post</button>
            </form>
        </div>
    )
};

export default NewActivity;