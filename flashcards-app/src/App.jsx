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
  const[userGuess, setUserGuess] = useState('') //user input guess
  const[feedback, setFeedback] = useState('')   //correctness check


  const handleSubmit = () => {
    const actualAnswer = cards[cardIndex].answer.trim().toLowerCase();
    const guess = userGuess.trim().toLowerCase();

    if(guess == actualAnswer){
      setFeedback('Correct!');
    }else{
      setFeedback('Incorrect!');
    }
  };

  const goToNextCard = () => {
    if(cardIndex < cards.length - 1){
      setCardIndex(cardIndex + 1);
      setUserGuess('');
      setFeedback('');
    }
  };

  const goToPrevCard = () => {
    if(cardIndex > 0){
      setCardIndex(cardIndex - 1);
      setUserGuess('');
      setFeedback('');
    }
  };

  return (
    <div className = "cards">
      <h1>Flashcards App</h1>
      <p>Practice random flashcards!</p>
      <p>Total Cards: {cards.length}</p>
      <Flashcard card = {cards[cardIndex]}/>
      <input
        type = "text"
        placeholder="Type your answer"
        value = {userGuess}
        onChange={(e) => setUserGuess(e.target.value)}
      />
      <button onClick = {handleSubmit}>Submit</button>
      <p>{feedback}</p>
    <div style={{ marginTop: '20px' }}>
      <button
        onClick={goToPrevCard}
        disabled={cardIndex === 0}
        style={{ marginRight: '10px' }}
      >
        Back
      </button>

      <button
        onClick={goToNextCard}
        disabled={cardIndex === cards.length - 1}
      >
        Next
      </button>
    </div>

    </div>
    );
}

export default App;