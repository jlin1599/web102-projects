import {useState, useEffect} from "react";

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

function App() {
  const [recipes, setRecipes] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [dietFilter, setDietFilter] = useState("All")

  const totalRecipes = recipes.length;
  const totalVegetarian = recipes.filter(r => r.vegetarian).length;

  const averageHealthScore =
    recipes.length === 0
      ? 0
      : Math.round(
          recipes.reduce((sum, r) => sum + r.healthScore, 0) / recipes.length
        );


  useEffect(() =>{
    const fetchRecipes = async () =>{
      try{
        const res = await fetch(
          `https://api.spoonacular.com/recipes/random?number=10&apiKey=${API_KEY}`
        );
        const data = await res.json()
        setRecipes(data.recipes)
      } catch(err){
        console.error("Failed to fetch recipe", err)
      }
    };
    fetchRecipes();
  }, []);

  return(
    <div>
      <h1>🍽 Recipe Dashboard</h1>
      <div style={{ marginBottom: "20px" }}>
    <h2>📊 Summary</h2>
    <p>Total Recipes: {totalRecipes}</p>
    <p>Vegetarian Recipes: {totalVegetarian}</p>
    <p>Average Health Score: {averageHealthScore}</p>
  </div>

      <input
        type = "text"
        placeholder = "Search recipes"
        value = {searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style = {{marginBottom: "20px", padding: "8px", fontSize: "16px"}}
      />
      <select
        value = {dietFilter}
        onChange = {(e) => setDietFilter(e.target.value)}
        style = {{marginBottom: "20px", padding:"8px", fontSize: "16px"}}
      >
        <option value = "All">All</option>
        <option value = "Vegetarian">Vegetarian</option>
        <option value = "Non-Vegetarian">Non-Vegetarian</option>
      </select>
      {recipes
        .filter((recipe) =>
          recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter((recipe) =>{
          if(dietFilter === "All") return true;
          if(dietFilter === "Vegetarian") return recipe.vegetarian === true;
          if(dietFilter === "Non-Vegetarian") return recipe.vegetarian === false;
        })
        .map((recipe) =>(
          <div key = {recipe.id}>
            <h3>{recipe.title}</h3>
            <img src = {recipe.image} alt = {recipe.title} with = {200} />
          </div>
      ))}
    </div>
  );
}


export default App;