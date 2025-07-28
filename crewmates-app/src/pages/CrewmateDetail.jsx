import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {supabase} from "../supabaseClient"


export default function CrewmateDetail() {
    const {id} = useParams()
    const [crewmate, setCrewmate] = useState(null)

    useEffect(() => {
        const fetchCrewmate = async () =>{
            const {data, error} = await supabase 
                .from("Crewmates")
                .select("*")
                .eq("id", id)
                .single()
            
            if(error){
                console.error("Error fetching crewmate:", error)
            }else {
                setCrewmate(data)
            }
        };
        fetchCrewmate();
    }, [id])


    return (
        <div>
            <h2>Crewmate Details</h2>

            {crewmate ? (
                <div>
                    <p><strong>Name:</strong> {crewmate.name}</p>
                    <p><strong>Attribute:</strong> {crewmate.attribute}</p>
                    <p><strong>Created At:</strong> {new Date(crewmate.created_at).toLocaleDateString()}</p>
                

                    <Link to ={`/edit/${crewmate.id}`}>
                        <button>Edit Crewmate</button>
                    </Link>
                    <br/>
                    <Link to = "/">
                        <button> Back to Summary </button>
                    </Link>
                </div>
            ) : (
                <p>Loading crewmate...</p>
            )}
        </div>
    )
}