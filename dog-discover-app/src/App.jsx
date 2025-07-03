import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [dog, setDog] = useState(null);

  const fetchDog = async() =>{
    const res = await fetch('https://api.thedogapi.com/v1/images/search',{
      headers:{
        'x-api-key': import.meta.env.VITE_DOG_API_KEY
      }
    });
    const data = await res.json();
    setDog(data[0]);
  };

  return (
    <div className="App">
      <h1>Dog Discover App</h1>
      <button onClick ={fetchDog}>Discover a Dog</button>

      {dog && (
        <div className = "dog-info"> 
          <img src = {dog.url} alt = "dog" width={300}/>
          <p><strong>Name:</strong> {dog.breeds?.[0]?.name || 'Unknown'}</p>
          <p><strong>Origin:</strong> {dog.breeds?.[0]?.origin || 'Unknown'}</p>
          <p><strong>Temperament:</strong> {dog.breeds?.[0]?.temperament || 'Unknown'}</p>         
        </div>
      )}
    </div>
  );
}

export default App;
