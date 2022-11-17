import React, { useState, useEffect } from "react";
import {Link, useOutletContext, useParams } from "react-router-dom";

const Routines = () => {
    const [, routines] = useOutletContext();
    const currentToken = localStorage.getItem("token");

    return (
        <div> 
            { currentToken && currentToken.length ? routines.map((eachRoutine, idx) => {
                return <div key={idx}>
                    <h2>{eachRoutine.name}</h2>
                    <h4>Goal: {eachRoutine.goal}</h4>
                    <p><b>Created by: </b>{eachRoutine.creatorName}</p>
                </div>
        }) : 
            <div>
                <p>Please log in or register for an account</p>
                <Link to="/login">Click Here</Link>
            </div>
            }
        </div>
    )
};

export default Routines;