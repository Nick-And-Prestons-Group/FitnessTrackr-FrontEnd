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
    const [selectedRoutineId, setSelectedRoutineId] = useState(0)
    const [countInput, setCountInput] = useState(0)
    const [durationInput, setDurationInput] = useState(0)

useEffect(()=>{
    async function UserRoutines() {

        try {
            const routinesResponse = await fetch("http://heroku-app.com/api/users/me",{
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
            const searchData =await response.json()
            console.log("these are the search results: ", searchData)
        } catch (error) {
            console.error
        }
    }
    function updateSelectedRoutineId(event) {
        setSelectedRoutineId(event.target.value)
    }

    function updateSearchInput(event) {
        setSearchInput(event.target.value)}
    
    function updateSelectionId(event) {
        setSelectionId(event.target.value)}

    function updateCount(event) {
        setCountInput(event.target.value)
    }

    function updateDuration(event) {
        setDurationInput(event.target.value)
    }
    function resetSearch() {
        setSearchInput("")
    }

    async function addActivity(selectedRoutineId, selectionId, countInput, durationInput) {
        try {
            const response = await fetch(`http://fitnesstrac-kr.herokuapp.com/routines/${selectedRoutineId}/activities`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                        },
                body: JSON.stringify({
                    activityId: selectionId,
                    count: countInput,
                    duration: durationInput
                })
            
            })
    
            const data= await response.JSON();
            console.log("this is the data: ", data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div> { currentToken && currentToken.length ? 
            <NewActivity />
            : null }
            <form onSubmit={SearchActivities}>
                <label htmlFor="searchbar">Search:</label>
                <input type="text" id="searchbar" value={searchInput} onChange={updateSearchInput}></input>
                {/* add submit button -and- clear button to get original list back */}
                <button type="clear" onClick={resetSearch}>Clear</button>
                <button type="submit">Submit</button>
            </form>
            {/* two ! forces boolean */}
            {typeof searchData === "undefined" ? 
                    activities.map((eachActivity, idx) => {
                        return <div key={idx}>
                            <h2>{eachActivity.name}</h2>
                            <p><b>Description: </b>{eachActivity.description}</p>
                            {!currentToken && currentToken.length ?
                                    <form onSubmit={addActivity}>
                                        <label htmlFor="activityId">Do you want to use this activity?</label>
                                        <input type="checkbox" name="activityId" value={eachSearch.id} onChange={updateSelectionId}></input>
                                        <label htmlFor="routine">Add to Routine:</label>
                                        <select name="routine" value={selectedRoutineId} onChange={updateSelectedRoutineId}>
                                            {myRoutines.map((routineSelect, idx)=>{
                                                <option value={routineSelect.id} >{routineSelect.name}</option>
                                            })}
                                        </select>
                                        <label htmlFor="durationInput">How many minutes do you want to do this activity?</label>
                                        <input type="number" name="durationInput" value={durationInput} onChange={updateDuration}></input>
                                        <label htmlFor="countInput">How many times?</label>
                                        <input type="number" name="countInput" value={countInput} onChange={updateCount}></input>
                                        <button type="submit">Add this activity!</button>
                                    </form>
                            :null}     
                        </div>
                     }) 
                     :
                     searchData.map((eachSearch, idx) => {
                        return <div key={idx}>
                            <h2> {eachSearch.name} </h2>
                            <p><b>Description:</b>{eachSearch.description}</p>
                            {!currentToken && currentToken.length ?
                                    <form onSubmit={addActivity}>
                                        <label htmlFor="activityId">Do you want to use this activity?</label>
                                        <input type="checkbox" name="activityId" value={eachSearch.id} onChange={updateSelectionId}></input>
                                        <label htmlFor="routine">Add to Routine:</label>
                                        <select name="routine" value={selectedRoutineId} onChange={updateSelectedRoutineId}>
                                            {myRoutines.map((routineSelect, idx)=>{
                                                <option value={routineSelect.id} >{routineSelect.name}</option>
                                            })}
                                        </select>
                                        <label htmlFor="durationInput">How many minutes do you want to do this activity?</label>
                                        <input type="number" name="durationInput" value={durationInput} onChange={updateDuration}></input>
                                        <label htmlFor="countInput">How many times?</label>
                                        <input type="number" name="countInput" value={countInput} onChange={updateCount}></input>
                                        <button type="submit">Add this activity!</button>
                                    </form>
                            :null}  
                        </div>
                    }) 
            }
            
        </div>
    )
};

export default Activities;