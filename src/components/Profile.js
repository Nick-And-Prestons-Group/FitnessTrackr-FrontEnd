import React from "react";
import { Link, useOutletContext, useNavigate } from "react-router-dom";
import MyRoutines from "./MyRoutines";

const Profile = () => {
    const currentToken = localStorage.getItem("token");
    const navigate = useNavigate();
    const {usernameState} = useOutletContext();
    const [username, setUsername] = usernameState;

    function logOutUser(event) {
        event.preventDefault();
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div>
            {currentToken && currentToken.length ?
            <div>
                <form onSubmit={logOutUser}>
                    <h2>Username: {username}</h2>
                    <button type="submit">Log Out</button>
                </form>
                <br />
                <MyRoutines />
            </div> : 
            <div>
                <p>Please log in or register for an account</p>
                <Link to="/login">Click Here</Link>
            </div> 
            }
        </div>
    )
};

export default Profile;