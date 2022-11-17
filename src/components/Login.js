import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function logInUser(event) {
        event.preventDefault();
        try {
            const response = await fetch("http://fitnesstrac-kr.herokuapp.com/api/users/login", {
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
                console.log("This is the data: ", data);
                // localStorage.setItem("token", token)
                navigate("/profile");

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
            <form onSubmit={logInUser}>Log In
                <br />
                <input type="text" value={username} onChange={updateUsernameState} placeholder="Your Username" required />
                <br />
                <input type="text" value={password} onChange={updatePasswordState} placeholder="Your Password" required />
                <br />
                <button type="submit">Submit</button>
                <br />
                <p>Don't have an account?<Link to={"/register"}>Register Here</Link></p>
            </form>
        </div>
    )
};

export default Login;