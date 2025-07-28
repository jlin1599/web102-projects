import { useState } from "react";
import {supabase} from '../supabaseClient'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function CreateCrewMate(){
    const [name, setName] = useState('')
    const [attribute, setAttribute] = useState('')
    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const {error} = await supabase
            .from('Crewmates')
            .insert([
            {name, attribute}
            ]);
        if (error){
            alert('Failed to create crewmate')
            console.log(error);
        }else{
            navigate('/')
        }
    }

    return(
        <div>
            <h2>Create a Crewmate</h2>
            <Link to = "/">
                <button type = "button">Back to Summary</button>
            </Link>
            <form onSubmit = {handleSubmit}>
                <input 
                    type ="text"
                    placeholder = "Enter crewmate name"
                    value = {name}
                    onChange={(e) => setName(e.target.value)}
                />
                <div>
                    <button type = "button" onClick={() => setAttribute('Strength')}>Strength</button>
                    <button type = "button" onClick={() => setAttribute('Magic')}>Magic</button>
                    <button type = "button" onClick={() => setAttribute('Agility')}>Agility</button>
                    <p>Selected Attribute: {attribute} </p>
                </div>
                <button type = "submit"> Create Crewmate</button>
            </form>
        </div>
    );
}