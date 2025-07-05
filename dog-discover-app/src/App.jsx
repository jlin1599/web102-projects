import { useState } from 'react';
import './App.css';

function App() {
  const [dog, setDog] = useState(null);
  const [banList, setBanList] = useState([]);

  const fetchDog = async () => {
    let found = false;
    let dogData = null;
    let tries = 0;

    while (!found && tries < 20) {
      const res = await fetch('https://api.thedogapi.com/v1/images/search', {
        headers: {
          'x-api-key': import.meta.env.VITE_DOG_API_KEY,
        },
      });
      const data = await res.json();
      const dogCandidate = data[0];
      const breed = dogCandidate.breeds?.[0];
      const name = breed?.name;

      if (breed && name && !banList.includes(name)) {
        found = true;
        dogData = dogCandidate;
      }

      tries++;
    }

    setDog(dogData);
  };

  const handleBan = (name) => {
    if (!name || banList.includes(name)) return;
    setBanList([...banList, name]);
  };

  return (
    <div className="App">
      <h1>Dog Discover App</h1>
      <button onClick={fetchDog}>Discover a Dog</button>

      {dog && (
        <div className="dog-info">
          <img src={dog.url} alt="dog" width={300} />
          <p>
            <strong>Name:</strong>{' '}
            <span
              style={{
                textDecoration: 'underline',
                cursor: 'pointer',
                color: '#00aaff',
              }}
              onClick={() => handleBan(dog.breeds?.[0]?.name)}
            >
              {dog.breeds?.[0]?.name || 'Unknown'}
            </span>
          </p>
          <p>
            <strong>Origin:</strong>{' '}
            {dog.breeds?.[0]?.origin || 'Unknown'}
          </p>
          <p>
            <strong>Temperament:</strong>{' '}
            {dog.breeds?.[0]?.temperament || 'Unknown'}
          </p>
        </div>
      )}

      {banList.length > 0 && (
        <div style={{ marginTop: '1.5rem' }}>
          <h3>Banned Breeds:</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {banList.map((name, index) => (
              <span
                key={index}
                onClick={() =>
                  setBanList(banList.filter((item) => item !== name))
                }
                style={{
                  background: '#ffc0cb',
                  padding: '6px 10px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}
              >
                {name} ✕
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
