import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [newError, setNewError] = useState(null);
    const [succesMessage, setSuccessMessage] = useState("")
    const navigate = useNavigate();

    async function registerUser(event) {
        event.preventDefault();
        try {
            const response = await fetch("http://fitnesstrac-kr.herokuapp.com/api/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
            const data = await response.json();
            localStorage.setItem("token", data.token);
            setNewError(data.error);
            setSuccessMessage(data.message)
            

        } catch (error) {
            console.error
        }
    };

    function updateUsernameState(event) {
        setUsername(event.target.value)
    };

    function updatePasswordState(event) {
        setPassword(event.target.value)
    };

    return (
        <div>
            <form onSubmit={registerUser}>Register Account
                <br />
                <input type="text" value={username} onChange={updateUsernameState} placeholder="Create Username" required />
                <br />
                <input type="password" value={password} onChange={updatePasswordState} placeholder="Create Password" required />
                <br />
                <button type="submit">Submit</button>
                <br />
                {newError && newError.length ? 
                    <div>
                        <p>{newError}</p>
                    </div>
                : <div>
                    <p>{succesMessage}</p>
                    <Link to="/profile">Go to profile</Link>
                </div>}
            </form>
        </div>
    )
};

export default Register;