import {useParams} from "react-router-dom"
import {useEffect, useState} from "react"

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

function DetailView () {
    const {id} = useParams();
    const[recipe, setRecipe] = useState(null);

    useEffect(() => {
        const fetchRecipeDetails = async () =>{
            try{
                const res = await fetch(
                `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
                );
                const data = await res.json();
                setRecipe(data);
            }catch(err){
                console.error("Failed to fetch recipe details", err)
            }
        };
        fetchRecipeDetails();
    },[id]);

    if (!recipe) return <p>Loading recipe details...</p>;

    return(
        <div>
            <h1>{recipe.title}</h1>
            <img src = {recipe.image} alt = {recipe.title} width = {300} />
            <p dangerouslySetInnerHTML={{__html: recipe.summary}}></p>
            <p><strong>Ready In:</strong>{recipe.readyInMinutes}minutes</p>
            <p><strong>Servings:</strong>{recipe.servings}</p>
            <p><strong>Health Score:</strong>{recipe.healthScore}</p>
            <a href = {recipe.souceURL} target = "_blank" rel = "nonreferrer">View Full Recipe</a>
        </div>
    );


}

export default DetailView;