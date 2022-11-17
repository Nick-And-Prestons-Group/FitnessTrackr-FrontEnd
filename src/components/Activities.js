import React, { useState, useEffect } from "react";
import {Link, useOutletContext, useParams } from "react-router-dom";
import NewActivity from "./NewActivity";

const Activities = () => {
    const [activities] = useOutletContext();
    const currentToken = localStorage.getItem("token");

    return (
        <div> { currentToken && currentToken.length ? 
            <NewActivity /> 
            : null }
            { activities.map((eachActivity, idx) => {
                return <div key={idx}>
                    <h2>{eachActivity.name}</h2>
                    <p><b>Description: </b>{eachActivity.description}</p>
                </div>
                })
            }
        </div>
    )
};

export default Activities;