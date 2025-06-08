const Card = ({game, date, time, location, link}) => {
    return(
        <div>
            <h2>{game}</h2>
            <p><strong>Date:</strong>{date}</p>
            <p><strong>Time:</strong>{time}</p>
            <p><strong>Location:</strong>{location}</p>
            {link && (
               <a href = {link} target = "_blank" rel = "noopener noreferrer">
                <button className = "watch-btn">Watch</button>
               </a> 
            )}
        </div>
    )
}
export default Card;