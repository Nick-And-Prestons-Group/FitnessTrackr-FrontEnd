import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewActivity = () => {
    const [name, setName] = useState("");
    const [newActName, setNewActName] = useState("");
    const [newActDescription, setNewActDescripton] = useState("");
    const [newError, setNewError] = useState(null);
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
            setNewActName(data.name);
            setNewActDescripton(data.description);
            setNewError(data.error)
            console.log("this is the name response: ", newActName)
            console.log("this is the description response: ", newActDescription)
            console.log("this is the error response: ", newError)
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
                {newActName && newActName.length ? 
                    <div>
                        <p>{newActName}</p>
                        <p>{newActDescription}</p>
                        <p>{newError}</p>
                    </div>
                : null}
            </form>
        </div>
    )
};

export default NewActivity;

// ternary operator for if activities/error state is valid and render content