import React, { useState, useEffect } from "react";
import {Link, useOutletContext, useParams } from "react-router-dom";
import RoutineDetails from "./RoutineDetails";

const Routines = () => {
    const {routineState} = useOutletContext();
    const [routines, setRoutines] = routineState
    const currentToken = localStorage.getItem("token");
    const [searchInput, setSearchInput] = useState("");
    

    async function SearchRoutines(searchInput) {
    // add useffect v experiment with settimeout for autocomplete
        try {
            const response = await fetch("http://placeholder.com/api/routines/search", {
             
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
    }
    function resetSearch() {
        setSearchInput("")
    }

    return (
        <div> 
            { !currentToken && !currentToken.length ? 
                <div>
                    <p>Please log in or register for an account to view routines</p>
                    <Link to="/login">Click Here</Link>
                </div>
                :
                <div>
                
                    <form onSubmit={SearchRoutines}>
                        <label htmlFor="searchbar">Search:</label>
                        <input type="text" id="searchbar" value={searchInput} onChange={updateSearchInput}></input>
                        {/* add submit button -and- clear button to get original list back */}
                        <button type="clear" onClick={resetSearch}>Clear</button>
                        <button type="submit">Submit</button>
                    </form>
                    {
                    typeof searchData === "undefined" ?
                    routines.map((eachRoutine, idx) => {
                        return <div key={idx}>
                            <h2>{eachRoutine.name}</h2>
                            <h4>Goal: {eachRoutine.goal}</h4>
                            <p><b>Created by: </b>{eachRoutine.creatorName}</p>
                            <Link to={`/routines/${eachRoutine.id}`}>See more</Link>
                            </div>
                        }) 
                        :
                    searchData.map((eachSearch, idx) =>{
                    return <div key = {idx}>
                        <h2>{eachSearch.name}</h2>
                        <h4>Goal: {eachSearch.goal}</h4>
                        <p><b>Created by: </b>{eachSearch.creatorName}</p>
                        <Link to={`/routines/${eachSearch.id}`}>See more</Link>
                    </div>
                    })
                    

                }
                </div>
            }
        </div>
    )
};

export default Routines;