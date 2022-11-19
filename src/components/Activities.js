import React, { useState, useEffect } from "react";
import {Link, useOutletContext, useParams } from "react-router-dom";
import NewActivity from "./NewActivity";



const Activities = () => {
    const {activitiesState} = useOutletContext();
    const [activities, setActivities] = activitiesState;
    const currentToken = localStorage.getItem("token");
    const [searchInput, setSearchInput] = useState("");

    async function SearchActivities(event) {
        event.preventDefault();
        try {
            const response = await fetch("http://placeholder.com/api/activities/search", {
             
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    searchinput: searchInput
                })
            })
            const searchData = await response.json()
            console.log("these are the search results: ", searchData)
        } catch (error) {
            console.error
        }
    }

    function updateSearchInput(event) {
        setSearchInput(event.target.value)
    }

    return (
        <div> { currentToken && currentToken.length ? 
            <NewActivity />
            : null }
            <label for="searchbar">Search:</label>
            <input type="text" id="searchbar" value={searchInput} onChange={updateSearchInput}></input>

            { searchInput && searchInput.length ? 
                    searchData.map((eachSearch, idx) => {
                        return <div key={idx}>
                            <h2> ${eachSearch.name} </h2>
                            <p><b>Description:</b>{eachSearch.description}</p>
                        </div>
                    }) 
  
            :
                    activities.map((eachActivity, idx) => {
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