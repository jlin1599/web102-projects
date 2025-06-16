import {useState} from 'react';
import Flashcard from './Flashcard';
import './App.css';

function App() {

  const cards = [
    {question : "Capital of Japan?", answer: "Tokyo"},
    {question: "3x3?", answer: "9"},
    {question:"Fire triangle: heat, oxygen, _?", answer: "fuel"}
  ];

  const[cardIndex, setCardIndex] = useState(0)

  const showRandomCard = () =>{
    const randomIndex = Math.floor(Math.random() * cards.length);
    setCardIndex(randomIndex);
  };

  return (
    <div className = "cards">
      <h1>Flashcards App</h1>
      <p>Practice random flashcards!</p>
      <p>Total Cards: {cards.length}</p>
      <Flashcard card = {cards[cardIndex]}/>
      <button onClick = {showRandomCard}>Next Card</button>
    </div>
  );
}

export default App;