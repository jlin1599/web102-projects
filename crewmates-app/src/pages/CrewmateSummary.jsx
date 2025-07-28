import { useState, useEffect } from "react";
import {supabase} from "../supabaseClient"
import { Link } from "react-router-dom";


export default function CrewmateSummary() {
    const [crewmates, setCrewmates] = useState([]);

    useEffect(() =>{
        fetchCrewmates();
    }, [])

    const fetchCrewmates = async () =>{
        const{data, error} = await supabase
        .from("Crewmates")
        .select("*")
        .order("created_at", {ascending:false}) 
        
        if(error){
            console.error("Failed to fetch crewmates:", error)
        }else{
            setCrewmates(data)
        }
    }
    const handleDelete = async(id) =>{
        const {error} = await supabase
            .from('Crewmates')
            .delete()
            .eq('id', id)

        if(error){
            console.error("Failed to delete", error)
        }else{
            fetchCrewmates();
        }
    }
    

    return (
        <div>
            <h2>Crewmate Summary</h2>
            <Link to = "/create">
                <button>Create New Crewmate</button>
            </Link>
            <ul>
                {crewmates.map((c) =>(
                    <li key = {c.id}>
                        <Link to ={`/crewmate/${c.id}`}>
                            <strong>{c.name}</strong> - {c.attribute}
                        </Link> - {c.attribute}
                        <Link to ={`/edit/${c.id}`}>
                            <button>Edit</button>
                        </Link>
                        <button onClick = {() => handleDelete(c.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}