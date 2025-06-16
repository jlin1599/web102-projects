import {useState, useEffect} from 'react';

function Flashcard({card}){

    const [flipped, setFlipped] = useState(false);
    useEffect(() =>{
        setFlipped(false);
    }, [card]);

    return(
        <div onClick={() => setFlipped(!flipped)} className = "flashcard">
            {flipped ? card.answer: card.question}
        </div>
    );
}

export default Flashcard;