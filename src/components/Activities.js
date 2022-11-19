import React, { useState, useEffect } from "react";
import {Link, useOutletContext, useParams } from "react-router-dom";
import NewActivity from "./NewActivity";



const Activities = () => {
    const {activitiesState} = useOutletContext();
    const [activities, setActivities] = activitiesState;
    const currentToken = localStorage.getItem("token") || false;
    const [searchInput, setSearchInput] = useState("");

    // add drop down for each activity to add to one of your routines

    async function SearchActivities(searchInput) {
    // add useffect v experiment with settimeout for autocomplete
        try {
            const response = await fetch("http://placeholder.com/api/activities/search", {
             
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    searchInput: `${searchInput}`
                })
            })
            const searchData = await response.json()
            console.log("these are the search results: ", searchData)
        } catch (error) {
            console.error
        }
    }
// useEffect(()=>{
//     SearchActivities(searchInput)
// },[])

    function updateSearchInput(event) {
        setSearchInput(event.target.value)
        // v better to put it to submit button
        // SearchActivities(searchInput)
    }
    // useEffect -> searchInput -> run  searchActivities(searchInput)


    return (
        <div> { currentToken && currentToken.length ? 
            <NewActivity />
            : null }
            <form onSubmit={SearchActivities}>
                <label for="searchbar">Search:</label>
                <input type="text" id="searchbar" value={searchInput} onChange={updateSearchInput}></input>
                {/* add submit button -and- clear button to get original list back */}
                <button type="clear" onClick= {setSearchInput("")}>Clear</button>
                <button type="submit">Submit</button>
            </form>
            {/* two ! forces boolean */}
            {!!searchData.length ? 
                    searchData.map((eachSearch, idx) => {
                        return <div key={idx}>
                            <h2> {eachSearch.name} </h2>
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