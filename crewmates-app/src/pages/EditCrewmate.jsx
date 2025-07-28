import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {supabase} from "../supabaseClient"

export default function EditCrewmate(){
    const {id} = useParams();
    const navigate = useNavigate()

    const [name, setName] = useState("");
    const [attribute, setAttribute] = useState("");

    useEffect(()=>{
        const fetchCrewmate = async () =>{
            const {data, error} = await supabase
                .from("Crewmates")
                .select("*")
                .eq("id", id)
                .single();
            
            if(error){
                console.error("Failed to fetch crewmate", error)
            }else{
                setName(data.name)
                setAttribute(data.attribute)
            }
        }
        fetchCrewmate();
    }, [id])

    const handleSubmit = async (e) =>{
        e.preventDefault();

        const {error} = await supabase
            .from("Crewmates")
            .update({name, attribute})
            .eq("id",id);
        
        if(error){
            console.error("Failed to update crewmate:", error)
        }else{
            navigate("/")
        }
    };

    return(
        <div>
            <h2>Edit Crewmate</h2>

            <form onSubmit = {handleSubmit}>
                <input 
                    type = "text"
                    placeholder = "Enter name"
                    value= {name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <div>
                <button type = "button" onClick={() => setAttribute("Strength")}>Strength</button>
                <button type = "button" onClick={() => setAttribute("Magic")}>Magic</button>
                <button type = "button" onClick={() => setAttribute("Agility")}>Agility</button>
                </div>

                <p>Selected Attribute: {attribute}</p>

                <button type = "submit">Update Crewmate</button>
            </form>
            <Link to = "/">
                <button type = "button">Back to Summary</button>
            </Link>
        </div>
    )
}