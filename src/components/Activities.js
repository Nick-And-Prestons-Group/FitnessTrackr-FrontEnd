import React, { useState, useEffect } from "react";
import {Link, useOutletContext, useParams } from "react-router-dom";
import NewActivity from "./NewActivity";



const Activities = () => {
    const {activitiesState, idState} = useOutletContext();
    const [activities, setActivities] = activitiesState;
    const [id, setId] = idState
    const currentToken = localStorage.getItem("token") || false;
    const [searchInput, setSearchInput] = useState("");
    const [selectionId, setSelectionId] = useState(0);


useEffect(()=>{
    async function UserRoutines(event) {
        event.preventDefault();
        try {
            const routinesResponse = await fetch("http://placeholder.com/api/users/me",{
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userID: `${id}`
                })
            })
            const myRoutines= await routinesResponse.json()
        } catch (error) {
            console.log(error)
        }
    }
    UserRoutines();
},[])

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



    function updateSearchInput(event) {
        setSearchInput(event.target.value)}
    
    function updateSelectionId(event) {
        setSelectionId(event.target.value)
    }

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
                                    {!!id.length ?
                                    <form onSubmit={placeholderpatch()}>
                                        <label for="routine">Add to routine</label>
                                        <select name="routine" onChange={updateSelectionId}>
                                            {myRoutines.map((routineSelect, idx)=>{
                                                <option value={routineSelect.id} >{routineSelect.name}</option>
                                            })}
                                        </select>
                                        <button type="submit">Add</button>
                                    </form>
                                    :null}       
                        </div>
                     }) 
            }
            
        </div>
    )
};

export default Activities;