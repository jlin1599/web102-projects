import {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

function Dashboard() {
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
  const chartData = recipes.map((r) => ({
  name: r.title.length > 20 ? r.title.slice(0, 20) + "..." : r.title,
  healthScore: r.healthScore,
  readyInMinutes: r.readyInMinutes,
  }));



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
      <h2>📈 Health Score per Recipe</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="healthScore" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>

      <h2>⏱️ Prep Time per Recipe</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="readyInMinutes" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

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
        .map((recipe) => (
        <Link
            key={recipe.id}
            to={`/recipe/${recipe.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
        >
            <div style={{ marginBottom: "20px" }}>
            <h3>{recipe.title}</h3>
            <img src={recipe.image} alt={recipe.title} width={200} />
            </div>
        </Link>
        ))}

    </div>
  );
}


export default Dashboard;