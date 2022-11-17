import React from "react";
import { Link, useOutletContext, useParams, useNavigate, Navigate } from "react-router-dom";
import RoutineDetails from "./RoutineDetails";

const Profile = () => {
    const currentToken = localStorage.getItem("token");
    const navigate = useNavigate();
    const [] = useOutletContext;

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
                    <h2>Username: </h2>
                    <h2>Name: </h2>
                    <button type="submit">Log Out</button>
                </form>
                <br />
                <RoutineDetails />
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