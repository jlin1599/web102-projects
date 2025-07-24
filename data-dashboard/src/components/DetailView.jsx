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
            <div style={{ marginBottom: "20px" }}>
            <h2>📊 Summary</h2>
            <p>Total Recipes: 10</p>
            <p>Vegetarian Recipes: —</p>
            <p>Average Health Score: —</p>
            </div>

            <input
            type="text"
            placeholder="Search recipes"
            style={{ marginBottom: "20px", padding: "8px", fontSize: "16px" }}
            disabled
            />

            <select
            style={{ marginBottom: "20px", padding: "8px", fontSize: "16px" }}
            disabled
            >
            <option value="All">All</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Non-Vegetarian">Non-Vegetarian</option>
            </select>

            <h1>{recipe.title}</h1>
            <img src = {recipe.image} alt = {recipe.title} width = {300} />
            <p dangerouslySetInnerHTML={{__html: recipe.summary}}></p>
            <p><strong>Ready In:</strong>{recipe.readyInMinutes}minutes</p>
            <p><strong>Servings:</strong>{recipe.servings}</p>
            <p><strong>Health Score:</strong>{recipe.healthScore}</p>
            <a href={recipe.sourceUrl} target="_blank" rel="noreferrer">
            View Full Recipe
            </a>
        </div>
    );


}

export default DetailView;